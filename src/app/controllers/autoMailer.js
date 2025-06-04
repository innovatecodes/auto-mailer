
const main = require("../services/main.js");

class AutoMailerController {

    static handleRequest = async (req, res) => {
        try {
            const info = await main(req);
            return res.status(200).json({
                message: "E-mail enviado!",
                info: info?.envelope
            });
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao enviar o e-mail",
                error: error.message
            }); 
        }
    }
}

module.exports = AutoMailerController;