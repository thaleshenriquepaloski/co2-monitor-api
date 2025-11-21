const dataBase = require("../database/models");

class Service {
    constructor(nomeModel) {
        this.model = nomeModel;
    }

    //produção
    async criarRegistro(dados) {
        return dataBase[this.model].create(dados);
    };

    //producao
    async pegarTodosRegistros() {
        return dataBase[this.model].findAll();
    };

    //producao
    async deletarTodosRegistros() {
        return dataBase[this.model].destroy({ where: {}, truncate: true })
    }
}

module.exports = Service;