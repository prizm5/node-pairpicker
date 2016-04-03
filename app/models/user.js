var user = {};

user.create = function(name:string, pass:string, admin:Boolean){
    var u = {
        name = name,
        password = pass,
        isadmin = admin
    };
    return u;
};

user.find = function(cb) {


}
module.exports = user;
