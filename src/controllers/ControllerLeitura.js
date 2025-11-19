const Controller = require("./Controller.js");
const ServiceLeitura = require("../services/ServiceLeitura.js");

const leituraService = new ServiceLeitura();

class ControllerLeitura extends Controller {
    constructor() {
        super(leituraService)
    }

    async criarRegistroEVerificar(req, res) {
        try {
            const dados = req.body;
            const resultado = await leituraService.criarRegistroEVerificar(dados);
            console.log(resultado)
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ControllerLeitura;