const tabla = require('../models/tabla.model')
const equipo = require('../models/equipos.model')
const ligas = require('../models/ligas.model')
const equiposliga = require('../models/quiposLiga.model')


function tablafunc(req, res) {

    var parametros = req.body;

    if (parametros.nombreLiga) {

        ligas.findOne({ nombreLiga: parametros.nombreLiga }, (err, ligaEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'error en al peticion' })
            if (!ligaEncontrado) return res.status(500).send({ mensaje: 'error al encontrar la liga' })

            equiposliga.find({ idLiga: ligaEncontrado._id }, (err, equiposligaEncontradr) => {
                if (err) return res.status(500).send({ mensaje: 'error en lapeticion' });
                if (!equiposligaEncontradr) return res.status(500).send({ mensaje: 'error en la peticion' })

                var numeroDeEquipo = [equiposligaEncontradr.length]
                var numeroJornada = []
                var numeroPartidos = []
                const modeloTabla = new tabla();

                if ((numeroDeEquipo % 2) == 0) {
                    numeroJornada = (numeroDeEquipo - 1);
                    numeroPartidos = (numeroDeEquipo / 2)

                    console.log("El numero de jornada es:" + numeroJornada)
                    console.log("El numero de partido es:" + numeroPartidos)

                } else {
                    numeroJornada = numeroDeEquipo
                    numeroPartidos = (numeroDeEquipo - 1) / 2;

                    console.log("El numero de jornada es:" + numeroJornada)
                    console.log("El numero de partido es:" + numeroPartidos)
                }  

                modeloTabla.jornadas = numeroJornada;
                modeloTabla.partidos = numeroPartidos;
                modeloTabla.equipo1 = parametros.equipo1;
                modeloTabla.equipo2 = parametros.equipo2;

                modeloTabla.save((err, tablaGuardada)=>{
                    if(err) return res.status(500).send({mensaje: 'error en la peticion'})
                    if(!tablaGuardada) return res.status(500).send({ mensaje: 'error al guardar la tabla'})

                    return res.status(500).send({ tabla: tablaGuardada})
                })             
            })
        })



    } else {
        return res.status(500).send({ mensaje: 'se requiere en nombre de la  liga' })
    }
}



module.exports = {

    tablafunc
}