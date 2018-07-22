const nodemailer = require('nodemailer');

const path = require('path');

const { host, port, user, pass } = require('../config/mail.json');

const hbs = require('nodemailer-express-handlebars');

//shortcut sintax - ES6
const transport = nodemailer.createTransport({
  service: 'gmail',
  host,
  port,
  auth: { user, pass },
});

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}));

module.exports = transport;

