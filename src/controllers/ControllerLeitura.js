const Controller = require("./Controller.js");
const ServiceLeitura = require("../services/ServiceLeitura.js");

const leituraService = new ServiceLeitura();

class ControllerLeitura extends Controller {
    constructor() {
        super(leituraService)
    }
}

module.exports = ControllerLeitura;