const { Router } = require("express");
const ControllerLeitura = require("../controllers/ControllerLeitura.js");

const leituraController = new ControllerLeitura();

const leituraRoutes = Router();

leituraRoutes
    .get("/teste", (req, res) => leituraController.getTeste(req, res))
    .get("/registros-leitura", (req, res) => leituraController.pegarRegistros(req, res))
    .post("/criar-leitura", (req, res) => leituraController.criarRegistro(req, res))
    .delete("/deletar-leitura/:id", (req, res) => leituraController.deletarRegistro(req, res))

module.exports = leituraRoutes;