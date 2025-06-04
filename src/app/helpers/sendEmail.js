const { initializeEnv, transporterFactory } = require("../helpers/transporter.js");

initializeEnv();

module.exports = async function sendEmail(req) {
    const { name, email, subject, message } = req.body;
    const emailSender = !process.env.NODEMAILER_SMTP_USER.includes("@")
        ? process.env.NODEMAILER_EMAIL_SENDER
        : process.env.NODEMAILER_SMTP_USER !== process.env.NODEMAILER_EMAIL_SENDER
            ? process.env.NODEMAILER_SMTP_USER
            : process.env.NODEMAILER_EMAIL_SENDER;

    return transporterFactory.sendMail({
        from: `${process.env.APP_NAME} <${emailSender}>`,
        to: `${process.env.APP_NAME} <${process.env.NODEMAILER_EMAIL_RECIPIENT}>`,
        replyTo: email,
        envelope: {
            from: emailSender, // Remetente / Autenticação SMTP (login real) 
            to: [
                process.env.NODEMAILER_EMAIL_RECIPIENT  // Destinatário real para entrega
            ],
        },
        subject: subject ?? `Novo contato de ${name}`,
        text: message,
        html: message
    });
}

