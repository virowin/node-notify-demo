var mysql = require('../util/mysql');

exports.check = function (params, res) {
	mysql.connection.connect();
	time = parseInt(Date.now() / 1000);

	var data = false;
	mysql.connection.query('SELECT * from `notify` where email = ? and code = ?', [params.email, params.code], function (error, results, fields) {
		if (error) throw error;
		if (results.length > 0) {
			mysql.connection.query('UPDATE `notify` SET `dateline` = ? , `status` = 1 WHERE `email` = ?', [time, params.email], function (error, results) {
				if (error) {
					console.log(error);
				}
				data = {
					'status' : 0,
					'msg' : 'good job!'
				};
				res.send(data);
				// mysql.connection.end();
			});
		} else {
			data = {
				'status' : 0,
				'msg' : 'invalid code'
			};
			res.send(data);
			// mysql.connection.end();
		}
	});

	// mysql.connection.end();
	// console.log(res);
	// return data;
};