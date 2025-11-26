const { Router } = require("express");
const ControllerConfiguracao = require("../controllers/ControllerConfiguracao.js");

const configuracaoController = new ControllerConfiguracao();

const configuracaoRoutes = Router();

configuracaoRoutes
    .get("", configuracaoController.pegarRegistrosTodos)
    .post("", configuracaoController.criarNovaConfig)
    .delete("", configuracaoController.deletaTodos)

module.exports = configuracaoRoutes;