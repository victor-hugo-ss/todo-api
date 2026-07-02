import "dotenv/config";
import { buildApp } from "./app.js";
import { env } from "./shared/config/env.js";

async function start() {
  const app = buildApp();

  try {
    app.listen({ port: env.PORT, host: "0.0.0.0" });
    console.log(`Servidor rodando em http://localhost:3000`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
