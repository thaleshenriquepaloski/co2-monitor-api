const Controller = require("./Controller.js");
const ServiceConfiguracao = require("../services/ServiceConfiguracao.js");

const configuracaoService = new ServiceConfiguracao();

class ControllerConfiguracao extends Controller {
    constructor() {
        super(configuracaoService);
    };
};

module.exports = ControllerConfiguracao;