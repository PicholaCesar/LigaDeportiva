const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tablaSchema = Schema({

    jornadas: Number,
    partidos: Number,
    equipo1: Number,
    equipo2: Number,
    ganador: String
})

module.exports = mongoose.model("Tablas", tablaSchema)