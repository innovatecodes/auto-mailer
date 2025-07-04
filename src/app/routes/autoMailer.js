const routes = require("express").Router();
// const asyncHandler = require("express-async-handler");
const autoMailerController = require("../controllers/autoMailer.js");
// Importa o multer, middleware para lidar com multipart/form-data (envio de formulários com arquivos ou não)
const multer = require("multer");

if (process.env.NODE_ENV === "development") routes.get("/", autoMailerController.renderHomePage);
// Rota de health check opcional usada pelo Load Balancer da AWS
if (process.env.NODE_ENV === "production")
    routes.get("/health", autoMailerController.healthyChecks);

// multer().none() configura o Multer para analisar requisições 'multipart/form-data' contendo apenas campos de texto, ignorando qualquer arquivo enviado.
routes.post("/api/send-email", multer().none(), autoMailerController.handleRequest);

/**
 * Usa express-async-handler para capturar erros em funções async
 * e enviá-los automaticamente para o middleware de erro do Express,
 * evitando a necessidade de try/catch no controller.
 *
 * Em Express 5 ou superior, isso não é necessário,
 * pois o Express já faz esse tratamento automaticamente.
 */
// routes.post('/api/send-email', multer().none(), asyncHandler(autoMailerController.handleRequest));

/**
 * Middleware catch-all que trata todas as requisições que não
 * corresponderam a nenhuma rota definida anteriormente.
 * Quando executado, responde com a página 404 via renderNotFoundPage.
 */
routes.use((request, response) => autoMailerController.renderNotFoundPage(request, response));

module.exports = routes;
