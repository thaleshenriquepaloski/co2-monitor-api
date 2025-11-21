const leituraRoutes = require("./leituraRoutes.js");
const configuracaoRoutes = require("./configuracaoRoutes.js");
const alertaRoutes = require("./alertaRoutes.js")

const routes = (app) => {
    app.use("/leitura", leituraRoutes);
    app.use("/configuracao", configuracaoRoutes);
    app.use("/alerta", alertaRoutes);
};

module.exports = routes;