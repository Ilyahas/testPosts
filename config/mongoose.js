const mongoose = require('mongoose');
const config = require('./index');

module.exports = () => {
    mongoose.connect(config.mongoUrl, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true);

    mongoose.connection.on('connected', () => {
        console.log(`Mongoose connection opened on ${config.mongoUrl}`)
    });
    mongoose.connection.on('error', () => {
        console.log(`Mongoose connection error  ${config.mongoUrl}`)
    })
};