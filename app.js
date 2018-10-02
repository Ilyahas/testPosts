const express = require('express');
const app = express();
const config = require('./config');

const swagger = require("swagger-node-express");

require('./config/express')(app);
require('./config/mongoose')();
require('./config/routes')(app);


app.listen(config.PORT, '0.0.0.0', () => console.log("App listening on port " + config.PORT + "!"));
