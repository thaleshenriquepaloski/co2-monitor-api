const Controller = require("./Controller.js");
const ServiceAlerta = require("../services/ServiceAlerta.js");

const alertaService = new ServiceAlerta();

class ControllerAlerta extends Controller {
    constructor() {
        super(alertaService);
    };
};

module.exports = ControllerAlerta;

