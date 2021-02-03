const nodemailer = require("nodemailer");

const user = 'no-reply@medifind.com';
const pass = 'medifind@2021';

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendVerificationEmail  = (name, email, confirmationCode) => {
  const hostUrl = process.env.hostURL;
  console.log("Check");
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${hostUrl}/verification?token=${token}&email=${to}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};