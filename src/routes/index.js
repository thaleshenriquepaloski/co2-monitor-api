const leituraRoutes = require("./leituraRoutes.js");

routes = (app) => {
    app.use(
        leituraRoutes
    );
};

module.exports = routes;