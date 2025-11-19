const express = require("express");
const routes = require("./routes");


const app = express();
app.use(express.json());

routes(app);
// app.get("/teste", (req, res) => {
//     res.status(200).json({ message: "Boas-vindas à API" });
// });

module.exports = app;