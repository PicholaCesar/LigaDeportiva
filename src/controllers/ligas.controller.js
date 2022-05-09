
const ligas = require('../models/ligas.model');

function agregarLiga(req, res){

    var parametros = req.body;
    var modeloLiga = new ligas();

    if(parametros.nombreLiga){

     modeloLiga.nombreLiga = parametros.nombreLiga

     modeloLiga.save((error, ligaGuardada)=>{
         if(error) return res.status(500).send({mensaje: "error en la peticion"});
         if(!ligaGuardada) return res.status(400).send({mensaje: "erro al guardar la liga"});

         return res.status(200).send({liga: ligaGuardada})
     })
    }
}

function editarliga(req,res){

    var idLiga = req.params.idliga;
    var parametros = req.body;

    ligas.findByIdAndUpdate(idLiga, parametros, {new: true },(err, ligaEditada)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'});
        if(!ligaEditada) return res.status(500).send({mensaje: 'erro al editar la liga'})

        return res.status(200).send({liga: ligaEditada})
    })

}

function eliminarliga(req, res){

    var idliga = req.params.idliga;

    ligas.findByIdAndDelete(idliga,(err, ligaeEliminada)=>{

        if(err) return res.status(500).send({mensaje:'error en la peticion'});
        if(!ligaeEliminada) return res.status(500).send({mensaje:'erro al eliminar la liga'});

        return res.status(200).send({liga: ligaeEliminada})
    })
}

function obtenerligas(req, res){

    ligas.find({},(err, ligasEncontradas)=>{
          if(err) return res.status(500).send({mensaje: 'error en la peticion'});
          if(!ligasEncontradas) return res.status(500).send({mensaje: 'erro al encontrar ligas'})

          return res.status(200).send({liga: ligasEncontradas})

    })
}

module.exports = {

    agregarLiga,
    editarliga,
    eliminarliga,
    obtenerligas
}