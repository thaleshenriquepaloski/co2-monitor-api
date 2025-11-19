require("./src/utils/cron/simularSensor.js");
require('dotenv').config();
const app = require("./src/app.js");

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta: ${PORT}`);
});