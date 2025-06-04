const express = require("express");
const cors = require("cors");
const routes = require("./app/routes/autoMailer.js");
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Middleware para processar application/x-www-form-urlencoded
app.use(cors()); 
app.use(routes); 

module.exports = app;

