const { Router } = require("express");
const ControllerLeitura = require("../controllers/ControllerLeitura.js");

const leituraController = new ControllerLeitura();

const leituraRoutes = Router();

leituraRoutes
    //producao
    .get("", leituraController.pegarRegistrosTodos)
    .get("/ultima", leituraController.pegarUltimaLeitura)
    .post("", leituraController.criarRegistroEVerificar)
    .delete("", leituraController.deletaTodos)

module.exports = leituraRoutes;