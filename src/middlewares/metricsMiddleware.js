const { httpRequestTotal, httpRequestDuration } = require("../utils/metrics.js");

function metricsMiddleware(req, res, next) {
    const end = httpRequestDuration.startTimer();
    
    res.on("finish", () => {
        httpRequestDuration.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status: res.statusCode
        });

        end({
            method: req.method,
            route: req.route ? req.route.path : req.path,
        });
    });

    next();
}

module.exports = metricsMiddleware;