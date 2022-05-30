const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ventaSchema = Schema({
    nombreProducto: String,
    cantidad: Number
})

module.exports = mongoose.model('Ventas', ventaSchema)