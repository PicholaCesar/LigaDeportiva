const Productos = require('../models/prodectos.model')
const Sucursales = require('../models/sucursales.model')
const productoSucursal = require('../models/productoSucursal.model')


function agregarProducto(req, res) {

    var parametros = req.body;
    var modeloProductos = new Productos()

    modeloProductos.nombreProducto = parametros.nombreProducto
    modeloProductos.nombreProveedor = parametros.nombreProveedor
    modeloProductos.Stock = parametros.Stock,
        modeloProductos.cantidad = parametros.cantidad
    modeloProductos.precio = parametros.precio
    modeloProductos.idCreador = req.user.sub

    modeloProductos.save((err, productoGuardado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!productoGuardado) return res.status(500).send({ mensaje: 'error al guardar producto' })

        return res.status(200).send({ producto: productoGuardado })
    })
}

function editarProducto(req, res) {

    var idProduc = req.params.idproducto;
    var parametros = req.body;

    Productos.findById(idProduc, (err, productoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!productoEncontrado) return res.status(500).send({ mensaje: 'error al encotrar el producto' })

        if (productoEncontrado.idCreador == req.user.sub) {

            Productos.findByIdAndUpdate(idProduc, parametros, { new: true }, (err, productoEditado) => {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                if (!productoEditado) return res.status(500).send({ mensaje: 'error al editar producto' })

                return res.status(200).send({ producto: productoEditado })
            })
        } else {
            return res.status(500).send({ mensaje: "solo el creador del producto tiene acceso" })
        }
    })
}

function obtenerProductos(req, res) {

    Productos.find({ idCreador: req.user.sub }, (err, productoEncotrados) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!productoEncotrados) return res.status(500).send({ mensaje: 'error al encontrar sucursales' })

        return res.status(200).send({ producto: productoEncotrados })
    })
}

function obtenerProdictID(req, res) {

    var idProduc = req.params.idproducto

    Productos.findById(idProduc, (err, productoEncotrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!productoEncotrado) return res.status(500).send({ mensaje: 'error al obtener producto' })

        return res.status(200).send({ producto: productoEncotrado })
    })
}

function eliminarProducto(req, res) {

    var idProduc = req.params.idproducto

    Productos.findByIdAndDelete(idProduc, (err, productoEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!productoEliminado) return res.status(500).send({ mensaje: 'error al eliminar El Producto' })

        return res.status(200).send({ producto: productoEliminado })
    })
}

function enviarProducto(req, res) {

    var parametros = req.body;

    var modeloProductoSucursal = new productoSucursal();

    Sucursales.findOne({ nombreSucursal: parametros.nombreSucursal }, (err, SucursalEncontrsa) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!SucursalEncontrsa) return res.status(500).send({ mensaje: 'error al encontrar la sucursal' })

        Productos.findOne({ nombreProducto: parametros.nombreProducto }, (err, productoEncotrado) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
            if (!productoEncotrado) return res.status(500).send({ mensaje: 'error al encontrar Producto' })

            if (parametros.cantidad <= productoEncotrado.cantidad) {

                var cantidad1 = parseInt(productoEncotrado.cantidad)
                var cantidad2 = parseInt(parametros.cantidad)
                var StokEmpresa = cantidad1 - cantidad2
                Productos.updateMany({ nombreProducto: parametros.nombreProducto }, { cantidad: StokEmpresa }, (err, actu) => {
                    if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                    if (!actu) return res.status(500).send({ mensaje: 'error al acutalizar' })

                    Productos.findOne({ nombreProducto: parametros.nombreProducto }, (err, productoEncotradom) => {
                        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                        if (!productoEncotradom) return res.status(500).send({ mensaje: 'error al encontrar Producto' })


                        if (parametros.cantidad <= productoEncotrado.cantidad) {



                            productoSucursal.findOne({ nombreProducto: parametros.nombreProducto }, (err, productoSucursalEncotrado) => {
                                if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                                if (!productoSucursalEncotrado) {
                                    modeloProductoSucursal.nombreProducto = parametros.nombreProducto
                                    modeloProductoSucursal.nombreProveedor = parametros.nombreProveedor
                                    modeloProductoSucursal.cantidad = parametros.cantidad
                                    modeloProductoSucursal.idCreador = SucursalEncontrsa._id

                                    modeloProductoSucursal.save((err, productosucGuardado) => {
                                        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                                        if (!productosucGuardado) return res.status(500).send({ mensaje: 'error al guardar productoSucursal' })

                                        return res.status(200).send({ productoSucursal: productosucGuardado })
                                    })
                                }

                                if (productoSucursalEncotrado) {

                                    var cantidad1 = parseInt(productoSucursalEncotrado.cantidad)
                                    var cantidad = parseInt(parametros.cantidad)
                                    var cantidadStok = cantidad + cantidad1


                                    productoSucursal.updateMany({ nombreProducto: parametros.nombreProducto }, { cantidad: cantidadStok }, (err, stokActuProSucursales) => {
                                        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                                        if (!stokActuProSucursales) return res.status(500).send({ mensaje: 'error al actulicar stok' })

                                        return res.status(200).send({ stok: stokActuProSucursales })
                                    })


                                }


                            })

                        } else {
                            return res.status(500).send({ mensaje: 'la cantidad del producto no esta en stok' })
                        }
                    })

                })
            } else {
                return res.status(500).send({ mensaje: 'ya no hay producto' })
            }
        })
    })
}




module.exports = {

    agregarProducto,
    editarProducto,
    obtenerProductos,
    obtenerProdictID,
    eliminarProducto,
    enviarProducto,

}