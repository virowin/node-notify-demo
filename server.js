var restify = require('restify');
var emailSend = require('./api/send');
var verify = require('./api/verify');

var server = restify.createServer({
  name: 'jiege-demo',
  version: '0.1.0'
});

server.use(restify.plugins.queryParser());

server.get('/mail/send', function (req, res, next) {
  var email = req.query.email;

  if (!email) {
    res.send({'error' : 'none email'});
  }

  // try {
    ret = emailSend.send(req.query, res);
  // } catch (e) {
  //   console.log('error');
  //   res.send({error : 'error'});
  // }

  return next();
});

server.get('/mail/verify', function (req, res, next) {
  var email = req.query.email;
  var code = req.query.code;

  if (!email || !code) {
    res.send({'error' : 'none email or code'});
  }

  // try {
    ret = verify.check(req.query, res);
  // } catch (e) {
  //   console.log('error');
  //   res.send({error : 'error'});
  // }

  return next();
});

server.listen(3011, function () {
  console.log('server start');
});
