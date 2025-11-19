const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function enviarEmail({para, assunto, texto}) {
    return mailer.sendMail({
        from: process.env.EMAIL_USER,
        to: para,
        subject: assunto,
        text: texto
    });
};

module.exports = enviarEmail;