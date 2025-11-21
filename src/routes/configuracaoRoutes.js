const { Router } = require("express");
const ControllerConfiguracao = require("../controllers/ControllerConfiguracao.js");

const configuracaoController = new ControllerConfiguracao();

const configuracaoRoutes = Router();

configuracaoRoutes
    .get("/registros", (req, res) => configuracaoController.pegarRegistrosTodos(req, res))
    .post("/criar", (req, res) => configuracaoController.criarNovaConfig(req, res))
    .delete("/deletar", (req, res) => configuracaoController.deletaTodos(req, res))

module.exports = configuracaoRoutes;    