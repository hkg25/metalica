require('../config/config.js')
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("../api/routes/routes.js")(app);

const server = app.listen(process.env.PORT, () => {
    console.log("API-Gateway listening on port %s...", server.address().port);
});