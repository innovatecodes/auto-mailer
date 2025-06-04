const app = require("./app.js");
const { initializeEnv, transporterFactory } = require("./app/helpers/transporter.js");

initializeEnv();

const port = !process.env.PORT ? 3001 : process.env.PORT;

app.listen(port, () => console.log(`http://localhost:${port}`));

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("🛑 SIGTERM encerrando...");
  // if (transporterFactory && typeof transporterFactory === "object") {
  // Promise.resolve garante que close seja tratado como Promise para evitar warnings
  await Promise.resolve(transporterFactory.close());
  process.exit(0);
  // }
});

