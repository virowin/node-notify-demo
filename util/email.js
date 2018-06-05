var nodemailer = require('nodemailer');  
var config = require('../config/email');  
  
var transporter = nodemailer.createTransport(config.config);  
  
exports.send = function(email, subject, html) {  
  mailOptions = {  
      from: '"jiege" <mailtestforjiege@126.com>', // login user must equel to this user  
      to: email ? email : 'mailtestforjiege@126.com',   
      subject: subject  ? subject : 'notice',  
      text: '',   
      html: html ? html : '<b>mail send success</b>'   
  };  
  
  transporter.sendMail(mailOptions, function(error, info){  
      if(error){  
          return console.log(error);  
      }  
      console.log('Message sent: ' + info.response);  
  });  
}  