const { Router } = require("express");
const ControllerAlerta = require("../controllers/ControllerAlerta.js");

const alertaController = new ControllerAlerta();

const alertaRoutes = Router();

alertaRoutes
    .get("/registros", (req, res) => alertaController.pegarRegistrosTodos(req, res))

module.exports = alertaRoutes;