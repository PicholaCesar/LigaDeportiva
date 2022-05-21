const Equipos = require('../models/equipos.model')

function agregarEquipo(req, res){

    var parametros = req.body;
    var modeloEquipo = Equipos();

    if(parametros.nombreEquipo){
 
        modeloEquipo.nombreEquipo = parametros.nombreEquipo;
        modeloEquipo.idUserCreadorEquipo = req.user.sub;

        modeloEquipo.save((err, equipoGuardado)=>{
            if (err) return res.status(500).send({mensaje: 'error en la peticion'})
            if(!equipoGuardado) return res.status(500).send({ mensaje: 'error al agregar equipo'})

            return res.status(200).send({equipo: equipoGuardado})
        })

    }
}

module.exports = {

    agregarEquipo
}