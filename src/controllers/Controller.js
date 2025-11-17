class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService;
    }

    // async getTeste(req, res) {
    //     try {
    //         const mensagem = await this.entidadeService.getTeste();
    //         res.status(200).json(mensagem);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }

    async criarRegistro(req, res) {
        try {
            const dadosRecebidos = req.body;
            const dadosCriados = await this.entidadeService.criarRegistro(dadosRecebidos);
            res.status(200).json(dadosCriados);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    async pegarRegistros(req, res) {
        try {
            const listaDeRegistros = await this.entidadeService.pegarRegistros();
            return res.status(200).json(listaDeRegistros);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletarRegistro(req, res) {
        try {
            const { id } = req.params;
            const delecao = await this.entidadeService.deletarRegistro(id);
            if(!delecao) return res.status(400).json({ message: "Falha na deleção de registro!" });
            return res.status(200).json({ message: "Registro deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = Controller;