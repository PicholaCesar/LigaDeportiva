const venta = require('../models/venta.model')
const productoSucursal = require('../models/productoSucursal.model')
const sucursales = require('../models/sucursales.model')


function obtenerProducto(req, res){

 var idSucursal = req.params.idsucursal;

    productoSucursal.find({idCreador: idSucursal },(err, proEncotradas)=>{
        if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
        if(!proEncotradas) return res.status(500).send({ mensaje: 'error al encontrar sucursales'})

        return res.status(200).send({sucursales: proEncotradas})
    })
}

function ventaP(req, res) {


    var parametros = req.body;
    var modeloVenta = new venta()

    productoSucursal.findOne({ nombreProducto: parametros.nombreProducto }, (err, productoEncotrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
        if (!productoEncotrado) return res.status(500).send({ mensaje: 'error al encontrar producto' })

        if (parametros.cantidad <= productoEncotrado.cantidad) {
            console.log("si")
            var num1 = parseInt(productoEncotrado.cantidad)
            var num2 = parseInt(parametros.cantidad)
            var Stoksucursal = num1 - num2
            productoSucursal.updateMany({ nombreProducto: parametros.nombreProducto }, { cantidad: Stoksucursal }, (err, stokActuProSucursales) => {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                if (!stokActuProSucursales) return res.status(500).send({ mensaje: 'error al actualizar Stok' })


                productoSucursal.findOne({ nombreProducto: parametros.nombreProducto }, (err, productoEncotradoq) => {
                    if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                    if (!productoEncotradoq) return res.status(500).send({ mensaje: 'error al encontrar producto' })



                    var numa = parseInt(productoEncotradoq.cantidad)

                    var numb = parseInt(parametros.cantidad)
                    var cantidadVentas = numa + numb

                    productoSucursal.updateMany({ nombreProducto: parametros.nombreProducto }, { cantidadVentas: cantidadVentas }, (err, ventasCantidad) => {
                        
                        if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                        if (!ventasCantidad) return res.status(500).send({ mensaje: 'error al cargar Ventas' })

                        modeloVenta.nombreProducto = parametros.nombreProducto
                        modeloVenta.cantidad = parametros.cantidad

                        modeloVenta.save((err, ventaGuardada) => {
                            if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                            if (!ventaGuardada) return res.status(500).send({ mensaje: 'error al guardar venta' })

                            return res.status(200).send({ venta: ventaGuardada })
                        })
                    })
                })

            })
        } else {
            return res.status(500).send({ mensaje: 'no hay lo sifuciente en stok' })
        }
    })


}



module.exports = {

    ventaP,
    obtenerProducto,
    
}