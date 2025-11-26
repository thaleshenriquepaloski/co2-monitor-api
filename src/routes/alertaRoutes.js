const { Router } = require("express");
const ControllerAlerta = require("../controllers/ControllerAlerta.js");

const alertaController = new ControllerAlerta();

const alertaRoutes = Router();

alertaRoutes
    .get("", alertaController.pegarRegistrosTodos)

module.exports = alertaRoutes;