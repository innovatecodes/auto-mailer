const express = require("express");
const cors = require("cors");
const routes = require("./app/routes/autoMailer.js");
const app = express();
const path = require("path");
const errorHandlerMiddleware = require("./app/middlewares/errorHandler.js");

app.use(express.json());
// Middleware para processar application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/**
 * Registra todas as rotas definidas no arquivo de rotas (routes).
 * A aplicação passará por essas rotas para tratar as requisições recebidas.
 * Isso inclui rotas como '/', '/api/send-email' e o middleware catch-all (404).
 */
app.use(routes);

errorHandlerMiddleware(app);

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
