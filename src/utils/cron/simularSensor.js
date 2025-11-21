const cron = require("node-cron");
const axios = require("axios"); //pra chamar a própria API
const { Leitura } = require("../../database/models");

//gerar dados falsos para simular Sensor
function gerarLeituraSimulada() {
    return {
        co2: Math.floor(Math.random() * 1000),
        umidade: 40 + Math.random() * 20,
        temperatura: 20 + Math.random() * 5,
        medidoEm: new Date()
    };
}
//---------

//usando cron para rodar o post a cada 5 segundos simulando o Sensor enviando dados
cron.schedule("*/5 * * * * *", async () => {
    const leituraFeita = gerarLeituraSimulada();
    try {
        await axios.post("http://localhost:8000/leitura/monitoramento", leituraFeita);
        console.log("Leitura enviada: ", leituraFeita)
    } catch (error) {
        console.error("Erro ao enviar leitura feita CRON: ", error.message);
    }
})