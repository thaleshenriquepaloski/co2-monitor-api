const Controller = require("./Controller.js");
const ServiceConfiguracao = require("../services/ServiceConfiguracao.js");

const configuracaoService = new ServiceConfiguracao();

class ControllerConfiguracao extends Controller {
    constructor() {
        super(configuracaoService);
    };

    //produção
    async criarNovaConfig(req, res) {
        try {
            const dados = req.body;
            const configCriada = await this.entidadeService.criarConfig(dados);
            return res.status(200).json(configCriada);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports = ControllerConfiguracao;