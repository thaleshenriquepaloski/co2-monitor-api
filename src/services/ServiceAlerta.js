const Service = require("./Services.js");
const enviarEmail = require("../utils/nodemailer.js");

class ServiceAlerta extends Service {
    constructor() {
        super("Alerta");
    };

    //producao
    async criaEEnviarAlertaPorEmail(dados) {
        const alertaCriado = await super.criarRegistro(dados);
        await enviarEmail({
            para: process.env.EMAIL_USER,
            assunto: "⚠️ ALERTA DE CO2",
            texto: alertaCriado.message
        })
    }
};

module.exports = ServiceAlerta;