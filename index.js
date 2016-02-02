var express = require('express');
var app = express();
var moment = require('Moment');
var bodyParser = require('body-parser');
var p = require('./pairpicker.js');
var utils = require('./utils.js');
var cookieParser = require('cookie-parser')

var dbname = 'dev_data';
var cradle = require('cradle');
var db_url = process.env.dburl || 'http://phisql12db01'
var db_port = process.env.dbport || 5984
var dbb = new (cradle.Connection)(db_url, db_port).database(dbname);

var async = require('async');

var isProd = process.env.isProd || true;

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', function (request, response) {
    var schema = request.headers['x-forwarded-proto'];
    if (isProd && schema === 'http') {
        response.redirect('https://' + request.headers.host + request.url);
    }
    var token = request.query.token;
    utils.checktoken(token, response, (function () {
        response.cookie('token', token, { maxAge: 900000, httpsOnly: true });
        response.sendfile('/some.html', { root: __dirname + "/public" });
    }));
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();          // get an instance of the express Router
router.get('/', function (req, res) {
    utils.checktoken(req.query.token, res, (function () {
        var pairings = p.generatePairs(p.getNames(devs.devs), []);
        utils.sendSlackText(pairings)
        res.status(200).end()
    }));
});

router.post('/', function (req, res) {
    utils.checktoken(req.cookies.token, res, (function () {
        console.log('post api send to slack: ' + req.body);
        utils.sendSlackText(req.body)
        res.status(200).end()
    })); 
});

router.get('/data/v5', function (req, res) {
    utils.checktoken(req.cookies.token, res, (function () {
        dbb.get('devs', function (err, doc) {
            if (err) {
                res.send({});
            }
            else {
                res.send(doc.names);
            }
        });
    }));

});

router.get('/data/cloud', function (req, res) {
    utils.checktoken(req.cookies.token, res, (function () {
        dbb.get('cloud', function (err, doc) {
            if (err) {
                console.error(err);
                res.send({});
            }
            else {
                res.send(doc.names);
            }
        });
    }));
});

router.post('/moveToCloud', function (req, res) {
    utils.checktoken(req.cookies.token, res, (function () {
        utils.moveToCloud(req.body.name)
        res.status(200).end()
    }));
});

router.post('/savePair', function (req, res) {
    utils.checktoken(req.cookies.token, res, (function () {
        var now = moment()
        var formatted = now.format('YYYY-MM-DD HH:mm:ss Z')
        var doc = {timestamp: formatted, pair: req.body, doc_type: 'pairing'}
        //var doc = {timestamp: new Date().to, pair: req.body, doc_type: 'pairing'}
        dbb.save(doc, function (err, doc) {
            if (err) {
                console.error(err);
                res.send({});
            }
            else {
                res.send(req.body);
            }
        });
        
    }));
});

router.post('/moveToDev', function (req, res) {
    utils.checktoken(req.cookies.token, res, (function () {
        utils.moveToDev(req.body.name)
        res.status(200).end()
    }));

});

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
