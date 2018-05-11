var db = require('../connection/dbconnection'); //reference of dbconnection.js

var login = {
    validateLogin: function (data, callback) {
        return db.query("SELECT * FROM user where username = ? and password = ? and status = 1;", [data.username, data.password], callback)
    }
};
module.exports = login;