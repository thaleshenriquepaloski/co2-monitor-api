const { Router } = require("express");
const ControllerLeitura = require("../controllers/ControllerLeitura.js");

const leituraController = new ControllerLeitura();

const leituraRoutes = Router();

leituraRoutes
    //teste:
    // .post("/teste", (req, res) => leituraController.criarRegistroEVerificar(req, res))
    //---
    .post("/monitoramento", (req, res) => leituraController.criarRegistroEVerificar(req, res))
    .get("/registros-leitura", (req, res) => leituraController.pegarRegistros(req, res))
    .post("/criar-leitura", (req, res) => leituraController.criarRegistro(req, res))
    .delete("/deletar-leitura/:id", (req, res) => leituraController.deletarRegistroPorId(req, res))
    .delete("/deletar-leitura-todos",(req, res) => leituraController.deletarTodosOsRegistros(req, res))

module.exports = leituraRoutes;