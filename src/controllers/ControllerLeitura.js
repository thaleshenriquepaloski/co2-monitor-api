const Controller = require("./Controller.js");
const ServiceLeitura = require("../services/ServiceLeitura.js");

const leituraService = new ServiceLeitura();

class ControllerLeitura extends Controller {
    constructor() {
        super(leituraService)
    };

    async pegarUltimo(req, res) {
        try {
            const dados = await leituraService.pegarUltimoRegistro();
            return res.status(200).json(dados)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async criarRegistroEVerificar(req, res) {
        try {
            const dados = req.body;
            const resultado = await leituraService.nova(dados);
            console.log(resultado)
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ControllerLeitura;