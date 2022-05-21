const liga = require('../models/ligas.model')
const equiposliga = require('../models/quiposLiga.model')
const equipo = require('../models/equipos.model')


function agregarEquipoLiga(req, res) {

    var parametros = req.body;

    if (parametros.nombreLiga && parametros.nombreEquipo) {

        liga.findOne({ nombreLiga: parametros.nombreLiga }, (err, ligaEncontrada) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
            if (!ligaEncontrada) return res.status(500).send({ mensaje: 'error al encontrar liga' })

            equiposliga.find({ idLiga: ligaEncontrada._id }).populate('idEquipos').exec((err, ligasEncontrdas) => {
                if (err) return res.status(500).send({ mensaje: 'error en la peticion ligas' })
                if (!ligasEncontrdas) return res.status(500).send({ mensaje: 'error al encontrar ligas' })


                if (ligasEncontrdas.length < 2) {

                    for (let i = 0; i < ligasEncontrdas.length; i++) {

                        if (ligasEncontrdas[i].idEquipos.nombreEquipo == parametros.nombreEquipo) return res.status(400)
                            .send({ mensaje: 'Ya se encuentra asignado a este curso.' })
                    }


                    equipo.findOne({ nombreEquipo: parametros.nombreEquipo }, (err, equipoEncontrado) => {
                        if (err) return res.status(500).send({ mensaje: 'error en la peticion de quipo' })
                        if (!equipoEncontrado) return res.status(500).send({ mensaje: 'error al encontrar equipo' })

                        var modelequipoporliga = new equiposliga();

                        modelequipoporliga.idLiga = ligaEncontrada._id;
                        modelequipoporliga.idEquipos = equipoEncontrado._id;

                        modelequipoporliga.save((err, equipoporligaGuardado) => {
                            if (err) return res.status(500).send({ mensaje: 'error en la peticion gradar equipos por ligas' })
                            if (!equipoporligaGuardado) return res.status(500).send({ mensaje: 'error al guradar equipoporligaGuardado' })

                            console.log(ligasEncontrdas.length)

                            return res.status(200).send({ mensaje: equipoporligaGuardado })

                           

                        })

                          



                    })



                } else {
                    return res.status(500).send({ mensaje: 'la liga ya tiene los 10 equipos' })
                }

                //cuantos Equipos estan asignado

            })          
        })
    }

    
}




module.exports = {
    agregarEquipoLiga
}


