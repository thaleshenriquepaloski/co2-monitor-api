const express = require("express");
const routes = require("./routes");
const metricsMiddleware = require("./middlewares/metricsMiddleware.js")


const app = express();

app.use(express.static("public"));
app.use(express.json());

//midleware de métricas
app.use(metricsMiddleware);

routes(app);

module.exports = app;