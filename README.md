# node-pairpicker

Pairpicker is an Angular (beta unfortunately) in typescript and nodejs application that uses CouchDB as a database.

## [CouchDB](http://couchdb.apache.org/)

You will need a CouchDB database. Once created, add db/teams.json as a normal document and db/views.json as a Design document.

## config.js

In order to run the site locally, you will need to set the database name in the config.js
``` 
config.dbname = 'dev_data';
```

## Running the site

Make sure you have all the needed dependencies by running ``` npm install ```.

You can then run ``` token=test npm start ``` to start TS compiling and nodemon watching.

Then navigate to: [http://localhost:5000/?token=test](http://localhost:5000/?token=test)

---

Is this better @steveshogren?