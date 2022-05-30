const mongoose = require('mongoose');
const Schema = mongoose.Schema

const sucursalesSchema = Schema({

    nombreSucursal: String,
    direccion: String,
    idCreador: {type: Schema.Types.ObjectId, ref: 'Empresas'}
})

module.exports = mongoose.model('Sucursales', sucursalesSchema)