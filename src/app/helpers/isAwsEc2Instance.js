const http = require("http");
const initializeEnv = require("../config/dotenv.js");

initializeEnv();

module.exports = function () {
    return new Promise(resolve => {
        // Define as opções da requisição HTTP
        const options = {
            method: "GET", // Faz uma requisição GET
            timeout: 1000, // Tempo máximo de 1 segundo antes de dar timeout
            host: process.env.AWS_HOST, // IP/host do serviço de metadados da AWS (normalmente 169.254.169.254)
            path: process.env.AWS_META_DATA, // Caminho que retorna informações sobre a instância EC2
        };

        // Cria a requisição HTTP
        const request = http.request(options, response => {
            // Se a resposta retornar status 200, significa que o host respondeu na AWS
            resolve(response.statusCode === 200);
        });
        // Se der erro ao tentar conectar (ex: host inexistente), resolve como falso
        request.on("error", () => resolve(false)); // Não está rodando em uma EC2
        // Se a requisição demorar mais que 1 segundo, cancela ela
        request.on("timeout", () => {
            request.destroy();
            resolve(false);
        });
        // Envia a requisição
        request.end();
    });
};
