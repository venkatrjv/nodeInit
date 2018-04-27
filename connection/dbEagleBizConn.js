var mysql = require('mysql');
var connection = mysql.createPool({

    host: '192.168.1.102',
    user: 'lwtslmis',
    password: 'lwtmis',
    database: 'eagle_biz_dev'

});
module.exports = connection;