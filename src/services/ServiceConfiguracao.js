const Service = require("./Services.js");
const dataBase = require("../database/models")

class ServiceConfiguracao extends Service {
    constructor() {
        super("Configuracao");
    };

    //producao
    async criarConfig(dados) {
        await dataBase[this.model].destroy({ where: {} });
        return dataBase[this.model].create(dados);
    }
}

module.exports = ServiceConfiguracao;