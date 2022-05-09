const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ligaSchema =  Schema({
    nombreLiga: String,
})

module.exports = mongoose.model("ligas", ligaSchema) 