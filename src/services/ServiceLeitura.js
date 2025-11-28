const Service = require("./Services.js");
const dataBase = require("../database/models");
const ServiceAlerta = require("./ServiceAlerta.js");
const { Op } = require("sequelize");

class ServiceLeitura extends Service {
    constructor() {
        super("Leitura");
        this.configuracao = dataBase.Configuracao;
        this.alerta = new ServiceAlerta();
        this.leitura = dataBase.Leitura;
    };

    //producao
    async pegarUltimoRegistro() {
        const ultimaLeitura = await this.leitura.findOne({
            order: [["medidoEm", "DESC"]]
        });
        const config = await this.configuracao.findOne();

        if(!ultimaLeitura) {
            return { leitura: null, maxCo2: config?.maxCo2 }
        }
        return {
            ...ultimaLeitura.toJSON(),
            maxCo2: config.maxCo2
        };
    }

    //producao
    async limpaRegistroAntigo(maxLeitura) {
        const maxDeRegistrosPermitido = maxLeitura;
        const registrosAtuais = await this.leitura.findAll({
            order: [["medidoEm", "ASC"]],
            attributes: ["id"]
        });

        if(registrosAtuais.length > maxDeRegistrosPermitido) {
            const qtdParaDeletar = registrosAtuais.length - maxDeRegistrosPermitido;
            const ids = registrosAtuais
                .slice(0, qtdParaDeletar)
                .map(r => r.id);
            await this.leitura.destroy({
                where: { id: { [Op.in]: ids } }
            });
            return console.log(`Apagadas ${ids.length} leituras antigas.`);
        }
    }

    //producao
    async criarNovaLeitura(dados) {
        try {
            const configSetada = await this.configuracao.findOne();
            if(!configSetada) {
                configSetada = await this.configuracao.create({
                    configSetada: { maxCo2: 1200 }
                });
            };

            const novaLeitura = await super.criarRegistro(dados);

            const maxLeituras = 50
            await this.limpaRegistroAntigo(maxLeituras)

            if(novaLeitura.co2 > configSetada.maxCo2) {
                const alertaNovo = {
                    leitura_id: novaLeitura.id,
                    message: `ATENÇÃO - CO2 ACIMA DO LIMITE: ${novaLeitura.co2}`
                };
                const alertaCriado = await this.alerta.criaEEnviarAlertaPorEmail(alertaNovo);
                return {
                    alerta: true,
                    mensagem: alertaCriado.message,
                    leitura: novaLeitura
                }
            } else {
                return {
                    alerta: false,
                    leitura: novaLeitura
                }
            }

        } catch (error) {
            console.error("Erro no service leitura: ");
            console.error(error);
            throw error;    
        }
    }

}

module.exports = ServiceLeitura;