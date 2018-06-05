var mysql = require('../util/mysql');
var mail = require('../util/email');
var md5 = require("md5");

exports.send = function (params, res) {
	mysql.connection.connect();
	time = parseInt(Date.now() / 1000);

	var data = false;
	console.log(11112333);
	mysql.connection.query('SELECT * from `notify` where email = ?', [params.email], function (error, results, fields) {
		if (error) throw error;
		console.log(results.length > 0, '>0???');
		if (results.length > 0) {
			var row = results[0];
			if (!row && row.dateline > time - 5 * 30) {
				data = {
					'error' : 'you can only get code once in 5 min!',
				};

				res.send(data);
				return;
			// } else if (false) {
				//同一ip限制注册次数
			} else {
				data = true;
			}
		} else {
			data = false;
		}

		time = parseInt(Date.now() / 1000);

		if (!data) {
			var code = md5(time + 'fadkfj');
			mysql.connection.query('INSERT INTO `notify` SET `email` = ? , `dateline` = ? , `code` = ?', [params.email, time, code], function (error, results) {
				if (error) {
					console.log(error);
				}
				data = {
					'status' : 0,
					'msg' : 'insert done'
				};
				res.send(data);
			});

		} else if (data === true) {
			var code = md5(time + 'faeqweqwdkfj');
			mysql.connection.query('UPDATE `notify` SET `dateline` = ? , `code` = ? WHERE `email` = ?', [time, code, params.email], function (error, results) {
				if (error) {
					console.log(error);
				}
				data = {
					'status' : 0,
					'msg' : 'update done'
				};
				res.send(data);
			});
		}
		console.log('click to <a href="http://127.0.0.1:3011/mail/verify?email='+params.email+'&code='+code+'">verify now!</a>');
		mail.send(params.email, 'click link to register', 'click to <a href="http://127.0.0.1:3011/mail/verify?email='+params.email+'&code='+code+'">verify now!</a>');
	  // console.log('The solution is: ', results[0].solution);
	});

	// mysql.connection.end();
	// console.log(res);
	// return data;
};