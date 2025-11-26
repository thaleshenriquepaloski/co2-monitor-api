const Controller = require("./Controller.js");
const ServiceLeitura = require("../services/ServiceLeitura.js");

const leituraService = new ServiceLeitura();

class ControllerLeitura extends Controller {
    constructor() {
        super(leituraService)
    };

    //produção
    async pegarUltimaLeitura(req, res) {
        try {
            const dados = await this.entidadeService.pegarUltimoRegistro();
            return res.status(200).json(dados)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    //produção
    async criarRegistroEVerificar(req, res) {
        try {
            const dados = req.body;
            if(!dados || Object.keys(dados).length === 0) {
                return res.status(400).json({ message: "Dados invalidos" })
            }
            const resultado = await this.entidadeService.criarNovaLeitura(dados);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ControllerLeitura;