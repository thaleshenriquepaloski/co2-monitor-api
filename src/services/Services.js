const dataBase = require("../database/models");

class Service {
    constructor(nomeModel) {
        this.model = nomeModel;
    }

    // async getTeste() {
    //     const objeto = { message: "Endpoint de TESTE!!" };
    //     return objeto;
    // }

    async criarRegistro(dados) {
        return dataBase[this.model].create(dados);
    };

    async pegarRegistros() {
        return dataBase[this.model].findAll();
    };

    async pegarRegistroPorId(where) {
        return dataBase[this.model].findOne({
            where: { ...where }
        });
    };

    async deletarRegistro(id) {
        const dadosDeletados = await dataBase[this.model].destroy({ where: { id } });
        return dadosDeletados > 0
    }
}

module.exports = Service;