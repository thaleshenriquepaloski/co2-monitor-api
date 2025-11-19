const Service = require("./Services.js");
const dataBase = require("../database/models");
const ServiceAlerta = require("./ServiceAlerta.js");


class ServiceLeitura extends Service {
    constructor() {
        super("Leitura");
        this.configuracao = dataBase.Configuracao;
        this.alerta = new ServiceAlerta();
    };

    async criarRegistroEVerificar(dados) {
        const configSetada = await this.configuracao.findOne();
        if(!configSetada) throw new Error("Nenhuma configuração encontrada");
        const novoRegistro = await super.criarRegistro(dados);

        if(novoRegistro.co2 >= configSetada.maxCo2) {
            const alertaNovo = {
                leitura_id: novoRegistro.id,
                message: `ATENÇÃO: CO2 em ${novoRegistro.co2}. Acima do limite!`
            };
            return await this.alerta.criaEEnviarAlertaPorEmail(alertaNovo);
        }
        return false
    }
}

module.exports = ServiceLeitura;