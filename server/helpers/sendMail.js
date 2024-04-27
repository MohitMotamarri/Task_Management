const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.email.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "dachepallimanikanta158@gmail.com",
    pass: "hwzs tdau duua ppba",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(task) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'dachepallimanikanta158@gmail.com', // sender address
    to: task.userMail, // list of receivers
    subject: "Task Reminder", // Subject line
    text: "your task is about to end soon", // plain text body
    html, // html body
  });
  
}
module.exports = {sendMail};