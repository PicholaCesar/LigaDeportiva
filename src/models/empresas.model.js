const mongoose = require('mongoose');
const Schema = mongoose.Schema

const empresaSchema = Schema({

    nombreEmpresa: String,
    tipoEmpresa: String,
    email: String,
    password: String,
    rol: String


})

module.exports = mongoose.model('Empresas', empresaSchema)