const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, text) => {
    try {
        const testAccount = await nodemailer.createTestAccount();

        const transporter = new nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        })

        await transporter.sendMail({
            from: testAccount.user,
            to: email,
            subject: subject,
            text: text,
        });

        console.log('Email sent successfuly')
        return true
    } catch(e) {
        console.log(e, "Email not sent")
        return false
    }
}

module.exports = sendEmail
