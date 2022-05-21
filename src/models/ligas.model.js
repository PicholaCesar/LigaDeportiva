const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ligaSchema =  Schema({
    nombreLiga: String,
    idcreador: {type: Schema.Types.ObjectId, ref: 'Usuarios'}
})

module.exports = mongoose.model("ligas", ligaSchema) 