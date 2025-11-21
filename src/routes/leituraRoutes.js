const { Router } = require("express");
const ControllerLeitura = require("../controllers/ControllerLeitura.js");

const leituraController = new ControllerLeitura();

const leituraRoutes = Router();

leituraRoutes
    //producao
    .post("/monitoramento", (req, res) => leituraController.criarRegistroEVerificar(req, res))
    .get("/ultima", (req, res) => leituraController.pegarUltimaLeitura(req, res))
    //teste
    .get("/registros", (req, res) => leituraController.pegarRegistrosTodos(req, res))
    .delete("/deletar-todos",(req, res) => leituraController.deletaTodos(req, res))

module.exports = leituraRoutes;