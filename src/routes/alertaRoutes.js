const { Router } = require("express");
const ControllerAlerta = require("../controllers/ControllerAlerta.js");

const alertaController = new ControllerAlerta();

const alertaRoutes = Router();

alertaRoutes
    .get("/registros-alerta", (req, res) => alertaController.pegarRegistros(req, res))
    .post("/criar-alerta", (req, res) => alertaController.criarRegistro(req, res))
    .delete("/deletar-alerta/:id", (req, res) => alertaController.deletarRegistroPorId(req, res))

module.exports = alertaRoutes;