const Sucursales = require('../models/sucursales.model')

function agregarSucursales(req, res){

    var parametros = req.body;

    if(parametros.nombreSucursal && parametros.direccion){

        Sucursales.findOne({direccion: parametros.direccion},(err, suscursalesEncontrada)=>{
            if(err) return res.status(500).send({ mensaje: 'error en la peticion sucursales'})
            if(!suscursalesEncontrada){
    
                var modelSucursales = new Sucursales();
    
                modelSucursales.nombreSucursal = parametros.nombreSucursal,
                modelSucursales.direccion = parametros.direccion,
                modelSucursales.idCreador = req.user.sub,
    
                modelSucursales.save((err, sucursalGuardada)=>{
                    if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
                    if(!sucursalGuardada) return res.status(500).send({ mensaje: 'error al guardar el curso'})
    
                    return res.status(200).send({sucursal: sucursalGuardada})
                })            
            }
    
          
        }) 
    }


}


function obtenerSucursales(req, res){
    
    Sucursales.find({idCreador: req.user.sub},(err, sucursalesEncotradas)=>{
        if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
        if(!sucursalesEncotradas) return res.status(500).send({ mensaje: 'error al encontrar sucursales'})

        return res.status(200).send({sucursales: sucursalesEncotradas})
    })
}

function editarSucursales(req, res){

    var parametros = req.body;
    var idSucursal = req.params.idsucursal;

    Sucursales.findById(idSucursal,(err, sucursalEncotrada)=>{
        if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
        if(!sucursalEncotrada) return res.status(500).send({ mensaje: 'error al encotrar sucursal'})



            Sucursales.findByIdAndUpdate(idSucursal, parametros,(err, sucuralEditada)=>{
                if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
                if(!sucuralEditada) return res.status(500).send({ mensaje: 'error al editar sucursal'})

                return res.status(200).send({sucursal: sucuralEditada})
            })

    })
}

function eliminarSucursal(req, res){
    var idSucu = req.params.idsucursal

    Sucursales.findByIdAndDelete(idSucu,(err, SucursalEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
        if(!SucursalEliminada) return res.status(500).send({ mensaje: 'error al eliminar Sucursal'})

        return res.status(200).send({Sucursal: SucursalEliminada})
    })
}


function obtenerSucursalesID(req, res) {
    var idSucu = req.params.idsucursal

    Sucursales.findById(idSucu,(err, sucursalEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
        if(!sucursalEncontrado) return res.status(500).send({ mensaje: 'error al encontrar Sucursal'})

        return res.status(200).send({Sucursal: sucursalEncontrado})
    })
}
   
   



module.exports = {

    agregarSucursales,
    obtenerSucursales,
    editarSucursales,
    eliminarSucursal,
    obtenerSucursalesID
}