const { initializeEnv, transporterFactory } = require("./transporter.js");

initializeEnv();

module.exports = async function sendEmail(data) {
    const emailSender = !process.env.NODEMAILER_SMTP_USER.includes("@")
        ? process.env.NODEMAILER_EMAIL_SENDER
        : process.env.NODEMAILER_SMTP_USER !== process.env.NODEMAILER_EMAIL_SENDER
          ? process.env.NODEMAILER_SMTP_USER
          : process.env.NODEMAILER_EMAIL_SENDER;

    return transporterFactory.sendMail({
        from: `${process.env.APP_NAME || "E-mail"} <${emailSender}>`,
        to: `${process.env.APP_NAME} <${process.env.NODEMAILER_EMAIL_RECIPIENT}>`,
        replyTo: data.email,
        envelope: {
            from: emailSender, // Remetente / Autenticação SMTP (login real)
            to: [
                process.env.NODEMAILER_EMAIL_RECIPIENT, // Destinatário real para entrega
            ],
        },
        subject: data.subject || `Novo contato de ${data.name}`,
        text: data.message,
        html: data.message,
    });
};
