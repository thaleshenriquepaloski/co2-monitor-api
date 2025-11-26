const cron = require("node-cron");
const axios = require("axios"); //pra chamar a própria API
const { Leitura } = require("../../database/models");

/*
Deixando o simulador mais realista:
    - mantém um valor atual (valorAtual) e aplica pequenas variações a cada envio
    - tem tendência (subida/queda lenta) que pode mudar ao longo do tempo
    - tem picos raros (evento) para simular situações reais (muitas pessoas, falha de ventilação)
    - inicializa a partir da última leitura do banco, se existir
*/

/* ===== Parâmetros ajustáveis (tune aqui) ===== */
const CONFIG = {
    ppmInicialPadrao: 450, //caso não aja registro no banco
    variacaoMaximaPorCiclo: 12, // valor que pode variar por envio
    tendenciaMaxima: 3, // quanto a tendência pode mudar por ciclo
    probabilidadeInverterTendencia: 0.04, // chance de inverter/alterar a tendência
    probabilidadePico: 0.02, // chance de gerar pico/queda brusca
    magnitudePico: 120, // magnitude pico
    minPPM: 350,
    maxPPM: 2000
};
/* ============================================= */

let valorAtual = CONFIG.ppmInicialPadrao;
let tendecia = 0; //valor que empurra pra cima/baixo devagar (em ppm)

//função utilitária: gauss (Box-Muller) para ruído mais natural
function gaussiano(mean = 0, stddev = 1) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stddev + mean;
}

//inicializa valorAtual a partir do último registro no banco (se existir)
async function inicializarValorAtual() {
    try {
        const ultimo = await Leitura.findOne({order: [[createdAt, "DESC"]]});
        if(ultimo && ultimo.co2) {
            valorAtual = Number(ultimo.co2)
        } else {
            valorAtual = CONFIG.ppmInicialPadrao
        }
        console.log("Simulador iniciado com ppm = ", valorAtual);
    } catch (error) {
        console.error("Erro ao obter última leitura do DB. Usando padrão. Erro: ", error.message);
        valorAtual = CONFIG.ppmInicialPadrao;
    }
}

//gerando uma leitura suave e realista
function gerarLeituraSimulator() {
    // 1) pequenas flutuações gaussianas
    const ruido = gaussiano(0, CONFIG.variacaoMaximaPorCiclo / 3); //stddev mais suave

    // 2) alterar tendência ocasionalmente (mantém subida/queda continua)
    if(Math.random() < CONFIG.probabilidadeInverterTendencia) {
        //muda a tendência aleatóriamente dentro do máximo
        tendecia += (Math.random() * 2 - 1) * CONFIG.tendenciaMaxima;
        //clamp tendência pra não explodir
        if(tendecia > CONFIG.tendenciaMaxima * 2) tendecia = CONFIG.tendenciaMaxima * 2;
        if(tendecia < -CONFIG.tendenciaMaxima * 2) tendecia = CONFIG.tendenciaMaxima * 2;
    }

    // 3) aplicar tendência e ruído
    valorAtual += ruido + tendecia;

    // 4) picos raros (subida brusca ou queda brusca)
    if(Math.random() < CONFIG.probabilidadePico) {
        const direcao = Math.random() < 0.7 ? 1 : -1; //picos são mais prováveis de subir
        valorAtual += direcao * (CONFIG.magnitudePico * (0.5 + Math.random() * 0.7));
        console.log("Evento: pico simulado. novo ppm: ", Math.round(valorAtual));
    }

    // 5) suavização extra: movemos valor um pouco em direção a um "baseline" para evitar drift infinito
    const baseline = 450; //valor referência (ar razoavel)
    valorAtual += (baseline - valorAtual) * 0.002; //força muito pequena para puxar ao baseline

    // 6) limites físicos
    if(valorAtual < CONFIG.minPPM) valorAtual = CONFIG.minPPM;
    if(valorAtual > CONFIG.maxPPM) valorAtual = CONFIG.maxPPM;

    const co2 = Math.round(valorAtual);

    //umidade e temperatura ainda podem ser simples, mas com ruído suave também
    const umidade = +(40 + Math.random() * 20).toFixed(1);
    const temperatura = +(20 + Math.random() * Math.random() * 5 + gaussiano(0, 0.3)).toFixed(1);

    return {
        co2,
        umidade,
        temperatura,
        medidoEm: new Date()
    };
}

/* ===== rotina principal ===== */
(async function main() {
    await inicializarValorAtual();

    cron.schedule("*/5 * * * * *", async () => {
        const leituraFeita = gerarLeituraSimulator();
        try {
            await axios.post("http://localhost:8000/leitura", leituraFeita);
            console.log("Leitura enviada: ", leituraFeita);
        } catch (error) {
            console.error("Erro ao enviar leitura feita com CRON: ", error.message);
        }
    });
})();
