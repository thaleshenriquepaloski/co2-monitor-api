const { Router } = require("express");
const ControllerConfiguracao = require("../controllers/ControllerConfiguracao.js");

const configuracaoController = new ControllerConfiguracao();

const configuracaoRoutes = Router();

configuracaoRoutes
    .get("/registros-configuracao", (req, res) => configuracaoController.pegarRegistros(req, res))
    .post("/criar-configuracao", (req, res) => configuracaoController.criarNovaConfig(req, res))
    .delete("/deletar-configuracao/:id", (req, res) => configuracaoController.deletarRegistroPorId(req, res))

module.exports = configuracaoRoutes;