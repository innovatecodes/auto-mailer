const app = require("./app.js");
const { initializeEnv } = require("./app/helpers/transporter.js");

initializeEnv();

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
