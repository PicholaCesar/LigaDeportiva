const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equiposSchema = Schema({

    nombreEquipo: String,
    idUserCreadorEquipo: String,

})

module.exports = mongoose.model("Equipos",equiposSchema) 

