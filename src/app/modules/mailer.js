const nodemailer = require('nodemailer');

const { host, port, user, pass } = require('../config/mail.json');

//shortcut sintax - ES6
const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});

module.exports = transport;