const { initializeEnv } = require("../helpers/transporter.js");
const sendEmail = require("../helpers/sendEmail.js");
const sendAutoReply = require("../helpers/sendAutoReply.js");

initializeEnv();

module.exports = async function(req) {
    // try {
    //     await sendEmail(req);
    //     await sendAutoReply(req.body.name, req.body.email, req.body.subject);
    // } catch (error) {
    //     throw error;
    // }

    await sendEmail(req);
    await sendAutoReply(req.body.name, req.body.email, req.body.subject);
}

