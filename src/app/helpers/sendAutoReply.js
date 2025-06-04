const { initializeEnv, transporterFactory } = require("../helpers/transporter.js");
const getFormattedDate = require("../helpers/getFormattedDate.js");
const { renderPlainTextMessage, renderHtmlTemplate } = require("../templates/renderAutoReplyMessage.js");

initializeEnv();

module.exports = async function sendAutoReply(name, email, subject) { // Mas quando se tem o async, eu nao preciso usar o await, aqui dentro?
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
        from: `${process.env.APP_NAME} <${emailSender}>`,
        to: `${name} <${email}>`,

        envelope: {
            from: emailSender,
            to: [
                email
            ],
        },
        subject: `Re: ${subject ?? `Novo contato de ${name}`}`,
        text: plainTextMessage,
        html: htmlMessage /*plainTextMessage.replace(/\n/g, "<br>")*/
    });
}
