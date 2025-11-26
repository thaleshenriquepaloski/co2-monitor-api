class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService;
    }

    //produção
    pegarRegistrosTodos = async (req, res) => {
        try {
            const listaDeRegistros = await this.entidadeService.pegarTodosRegistros();
            return res.status(200).json(listaDeRegistros);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //produção
    deletaTodos = async (req, res) => {
        try {
            const delecao = await this.entidadeService.deletarTodosRegistros();
            if(delecao === 0) return res.status(400).json({ message: "Falha na exclusão dos registros!" });
            return res.status(200).json({ message: "Registro deletado com sucesso!" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = Controller;