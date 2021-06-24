require('dotenv').config()

const sendgridMail = require('@sendgrid/mail')
const pug = require('pug')
const path = require('path')

function alertMail(data) {
    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)
    sendgridMail.send({
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: 'Error Alert',
        html: pug.renderFile(path.resolve('./mail/view/alert.pug'), data)
    })
    .then(() => console.log('alert email sent'))
    .catch(console.error)
}

module.exports = alertMail