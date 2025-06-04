const routes = require("express").Router();
const autoMailerController = require("../controllers/autoMailer.js")

routes.post('/send-email', autoMailerController.handleRequest);

module.exports = routes;
