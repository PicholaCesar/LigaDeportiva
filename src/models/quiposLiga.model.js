const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equiposporliga = Schema({

    idLiga: {type: Schema.Types.ObjectId, ref: 'ligas'},
    idEquipos:{type: Schema.Types.ObjectId, ref: 'Equipos'},
    jornadas: Number,
    partidos: Number
})

module.exports = mongoose.model("Torneos", equiposporliga) 