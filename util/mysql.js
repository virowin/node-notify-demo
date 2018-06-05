var mysql      = require('mysql');
var config     = require('../config/mysql');
var connection = mysql.createConnection(config.config);

exports.connection = connection;
