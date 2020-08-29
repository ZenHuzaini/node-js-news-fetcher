require("dotenv").config();
const express = require("express");
const { buildContainer } = require("./container");

const { startControllers } = require("./startControllers");

async function prepareServer() {
  const app = express();
  const appRouter = express.Router();
  const container = buildContainer();

  applyMiddleware(app);
  startControllers(appRouter, container);

  app.use("/api", appRouter);
  return app;
}

async function startServer(port = 1996) {
  const server = await prepareServer();

  console.log("server is trying to run in port ", port);
  return server.listen(port).on("error", (e) => {
    console.log(`Server cannot be started because of ${e}`);
  });
}

function logRequest(req, res, next) {
  console.info(`${req.method} ${req.originalUrl}`);
  next();
}

function applyMiddleware(app) {
  app.use(logRequest);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: "10mb", extended: true }));
}

module.exports = { startServer, prepareServer };
