const { initializeEnv, transporterFactory } = require("./transporter.js");
const getFormattedDate = require("./getFormattedDate.js");
const {
    renderPlainTextMessage,
    renderHtmlTemplate,
} = require("../templates/renderAutoReplyMessage.js");

initializeEnv();

module.exports = async function sendAutoReply(name, email, subject) {
    const transporter = transporterFactory;
    const emailSender = !process.env.NODEMAILER_SMTP_USER.includes("@")
        ? process.env.NODEMAILER_EMAIL_SENDER
        : process.env.NODEMAILER_SMTP_USER !== process.env.NODEMAILER_EMAIL_SENDER
          ? process.env.NODEMAILER_SMTP_USER
          : process.env.NODEMAILER_EMAIL_SENDER;

    const formattedDate = getFormattedDate();
    const plainTextMessage = renderPlainTextMessage(name, emailSender, formattedDate);
    const htmlMessage = renderHtmlTemplate(name, emailSender, formattedDate);

    return transporter.sendMail({
        from: process.env.APP_NAME
            ? `Suporte ${process.env.APP_NAME} <${emailSender}>`
            : `Atendimento automático <${emailSender}>`,
        to: `${name} <${email}>`,
        envelope: {
            from: emailSender,
            to: [email],
        },
        headers: {
            "List-Unsubscribe": `<mailto:${emailSender}>`,
            "Auto-Submitted": "auto-replied",
            Precedence: "bulk",
        },
        subject: `Re: ${subject || `Novo contato de ${name}`}`,
        text: plainTextMessage,
        html: htmlMessage /*plainTextMessage.replace(/\n/g, "<br>")*/,
    });
};
