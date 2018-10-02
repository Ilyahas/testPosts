const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = (app, swagger) => {
    app.use(morgan('dev'));
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json({limit: '150mb'}));
    app.use(bodyParser.urlencoded({limit: '150mb', extended: true}));
    app.use(cookieParser());
    app.use(express.static('dist'));

};