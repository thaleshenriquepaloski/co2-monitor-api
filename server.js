require("./src/utils/cron/simularSensor.js");
require('dotenv').config();

const app = require("./src/app.js");
const metricsApp = require("./src/server/metricsServer.js");

const PORT = process.env.PORT || 8000;
const METRICS_PORT = process.env.METRICS_PORT || 9100;

app.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta: ${PORT}`);
});

metricsApp.listen(METRICS_PORT, () => {
    console.log(`Métricas rodando na porta: ${METRICS_PORT}`);
});