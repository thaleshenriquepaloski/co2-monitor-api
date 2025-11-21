const leituraRoutes = require("./leituraRoutes.js");
const configuracaoRoutes = require("./configuracaoRoutes.js");
const alertaRoutes = require("./alertaRoutes.js")

const routes = (app) => {
    app.use(
        leituraRoutes,
        configuracaoRoutes,
        alertaRoutes
    );
};

module.exports = routes;