const nodemailer = require("nodemailer");
const initializeEnv = require("../config/dotenv.js");

initializeEnv();

(function (port) {
    return !process.env.NODEMAILER_PORT
        ? (process.env.NODEMAILER_PORT = port.toString())
        : process.env.NODEMAILER_PORT;
})(587);

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: parseInt(process.env.NODEMAILER_PORT),
    secure: parseInt(process.env.NODEMAILER_PORT) === 465,
    maxConnections: 5,
    maxMessages: 100,
    auth: {
        user: process.env.NODEMAILER_SMTP_USER,
        pass: process.env.NODEMAILER_SMTP_PASS,
    },
    pool: true,
});

module.exports = {
    initializeEnv,
    transporterFactory: transporter,
    mailLib: nodemailer,
};
