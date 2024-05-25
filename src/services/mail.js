const nodemailer = require('nodemailer');

const AGENCY_MAIL = "huunlse150800@fpt.edu.vn"
const pass = "nguyenlehuu070900"

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: AGENCY_MAIL,
        pass: pass
    }
});

let mailOptions = {
    from: AGENCY_MAIL,
    to: "creator@gmail.com",
    subject: 'Chúc mừng bạn đã trở thành creator của chúng tôi',
    text: 'Tải app để bắt đầu hành trình nhé! Link App:....'
};

// transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//         console.log("________(mailERR)");
//     } else {
//         console.log('________Email sent: ' + info.response);
//     }
// });

let sendMail = (creator_mail) => {
    mailOptions.to = creator_mail;
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