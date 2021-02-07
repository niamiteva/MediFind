const nodemailer = require("nodemailer");
const config = require('../../configs/config')

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mail,
    pass: config.mailpass,
  },
});

module.exports.sendVerificationEmail  = (name, email, token) => {
  const hostUrl = process.env.hostURL || config.apiUrl;
  console.log("Check");
  transport.sendMail({
    from: config.mail,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${hostUrl}/verification?token=${token}&email=${email}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};