const ligas = require('../models/ligas.model');



function agregarLiga(req, res){

    var parametros = req.body;
    var modeloLiga = new ligas();

    if(parametros.nombreLiga){

     modeloLiga.nombreLiga = parametros.nombreLiga,
     modeloLiga.idcreador = req.user.sub;

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

//Funcion del usuario

function addligaUser (req, res){

    var parametros = req.body;
    var modeloLiga = new ligas();

    if(parametros.nombreLiga){
    
        modeloLiga.nombreLiga = parametros.nombreLiga;
        modeloLiga.idcreador = req.user.sub;

        modeloLiga.save((err, ligaGuardada)=>{
            if(err) return res.status(500).send({mensaje: 'error en la peticion'});
            if(!ligaGuardada) return res.status(500).send({mensaje:'error al guardar la liga'})

            return res.status(200).send({ liga: ligaGuardada})
        })
        

    }
}

function updateligaUser(req, res){

    var idliga = req.params.idliga;
    var params = req.body;

    ligas.findById(idliga,(err, ligaEncotrada)=>{
    if(err) return res.status(500).send({mensaje: 'request failed'});
    if(!ligaEncotrada) return res.status(500).send({ mensaje: 'error get liga'})

    if(ligaEncotrada.idcreador == req.user.sub){

        ligas.findByIdAndUpdate(idliga, params,{new : true},(err, ligaUpdate)=>{
          
            if(err) return res.status(500).send({mensaje: 'request failed'})
            if(!ligaUpdate) return res.status(500).send({ mensaje: 'error updating liga'})

            return res.status(200).send({liga: ligaUpdate})

        })
    }else{
        return res.status(500).send({ error: 'you can only access the ligas you created'})
    }
    })


}

function deleteLigaUser(req, res){

    var idliga = req.params.idliga;

    ligas.findById(idliga,(err, ligaEncontrada)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'});
        if(!ligaEncontrada) return res.status(500).send({mensaje: 'error al encotrar la liga'})

        if(req.user.sub == ligaEncontrada.idcreador){

            ligas.findByIdAndDelete(idliga,(err, ligaEliminada)=>{
                if(err) return res.status(500).send({mensaje: 'error en la peticion'})
                if(!ligaEliminada) return res.status(500).send({ mensaje: 'error al eliminar la liga'})

                return res.status(200).send({liga: ligaEliminada})
            })
        }else{
            return res.status(400).send({mensaje: 'solo el creador de la liga puede eliminarla'})
        }
    })
}

function getLigaUser(req, res){

    ligas.find({idcreador: req.user.sub},(err, ligasEncontradas)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'})
        if(!ligasEncontradas) return res.status(500).send({ mensaje: 'error al obtener ligas'})

        return res.status(200).send({liga: ligasEncontradas})
    })
}

module.exports = {
    //admnin
    agregarLiga,
    editarliga,
    eliminarliga,
    obtenerligas,
    //Usuario
    addligaUser,
    updateligaUser,
    deleteLigaUser,
    getLigaUser
}