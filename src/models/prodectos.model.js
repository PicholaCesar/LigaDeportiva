const mongoose = require('mongoose');
const Schema = mongoose.Schema


const productoSchema = Schema({
    nombreProducto: String,
    nombreProveedor: String,
    cantidad: Number,
    precio: Number,
    Stock: Number,
    idCreador: {type: Schema.Types.ObjectId, ref: 'Empresas'}
})

module.exports = mongoose.model('Productos', productoSchema)

