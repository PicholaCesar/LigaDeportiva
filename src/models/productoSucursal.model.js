const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productoSucursalSchema = Schema({

    nombreProducto: String,
    cantidad: Number,
    cantidadVentas: Number,
    idCreador: {type: Schema.Types.ObjectId, ref: 'Sucursales'}
})

module.exports = mongoose.model('ProductosSucursales', productoSucursalSchema)