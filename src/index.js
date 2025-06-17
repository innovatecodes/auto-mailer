const app = require("./app.js");
const { initializeEnv } = require("./app/helpers/transporter.js");

initializeEnv();

const port = process.env.PORT || 3001;

process.env.NODE_ENV === "development"
    ? app.listen(port, () => console.log(`http://localhost:${port}`))
    : app.listen(port);
