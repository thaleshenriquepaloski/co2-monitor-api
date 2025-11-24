const client = require("prom-client");

//coleta automática de métricas padrão (CPU, memória, etc.)
client.collectDefaultMetrics();

//contador de requisições por rota
const httpRequestTotal = new client.Counter({
    name: "http_request_total",
    help: "Total de requisições HTTP",
    labelNames: ["method", "route", "status"]
});

// Histograma de latência
const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duração das requisções em segundos",
    labelNames: ["method", "route"],
    buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2]
});

//Exporte para usar no app
module.exports = {
    httpRequestDuration,
    httpRequestTotal,
    client
};