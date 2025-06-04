const dotenv = require("dotenv");
const path  = require("path");

module.exports = function () {
    const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.development";
    dotenv.config({
        // path: `${__dirname}/../../../${envFile}`  
        path: path.resolve(__dirname, "../../../", envFile) 
    });
}

