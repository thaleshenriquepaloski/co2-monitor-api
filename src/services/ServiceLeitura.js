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

    async pegarUltimoRegistro() {
        const ultimaLeitura = await this.leitura.findOne({
            order: [["medidoEm", "DESC"]]
        });
        const config = await this.configuracao.findOne();
        return {
            ...ultimaLeitura.toJSON(),
            maxCo2: config.maxCo2
        };
    }

    async nova(dados) {
        try {
            const configSetada = await this.configuracao.findOne();
            if(!configSetada) throw new Error("Nenhuma configuração encontrada!");

            const novaLeitura = await super.criarRegistro(dados);

            const maxDeRegistrosPermitido = 10;

            //pegando todos os registros atyais da tabela, ordenando do mais antigo pro mais recente
            const registrosAtuais = await this.leitura.findAll({
                order: [["medidoEm", "ASC"]], //asc = mais antigo primeiro
                attributes: ["id"] //só pegamos o id pra economizar a memória
            });

            //vamos verficar se a tabela passou do limite
            if(registrosAtuais.length > maxDeRegistrosPermitido) {
                //quantos registros precisamos apagar para ficar no limite? 
                const qtdParaDeletar = registrosAtuais.length - maxDeRegistrosPermitido;
                //pega apenas os IDs dos registros que vamos apagar
                const ids = registrosAtuais
                    .slice(0, qtdParaDeletar) //primeiros registros
                    .map(r => r.id);
                //deleta os registros antigos do banco
                await this.leitura.destroy({
                    where: { id: { [Op.in]: ids } }
                });
                console.log(`Apagadas ${ids.length} leituras antigas.`);
            }

            if(novaLeitura.co2 > configSetada.maxCo2) {
                const alertaNovo = {
                    leitura_id: novaLeitura.id,
                    message: `ATENÇÃO - CO2 ACIMA DO LIMITE: ${novaLeitura.co2}`
                };
                return await this.alerta.criaEEnviarAlertaPorEmail(alertaNovo);
            }

            return false
        
        } catch (error) {
            console.error("Erro no service leitura: ");
            console.error(error);
            throw error;    
        }
    }

}

module.exports = ServiceLeitura;