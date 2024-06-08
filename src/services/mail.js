const nodemailer = require('nodemailer');

const AGENCY_MAIL = "huunlse150800@fpt.edu.vn"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: AGENCY_MAIL,
      pass: "csat ezns lito mntp"
    }
  });

let mailOptions = {
    from: "Nha tot sai gon",
    to: "huunlse150800@fpt.edu.vn",
    subject: 'Chúc mừng bạn đã trở thành creator của chúng tôi',
    text: 'Tải app để bắt đầu hành trình nhé! Link App:....'
};

let sendMail = (to_mail,subject,body) => {
    mailOptions.to = to_mail;
    mailOptions.subject = subject;
    mailOptions.text = body;
    console.log(mailOptions.to);
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("________(mailERR)"+ error);
        } else {
            console.log('________Email sent: ' + info.response);
        }
    });
}


module.exports ={
sendMail
}