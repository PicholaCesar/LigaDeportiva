const tabla = require('../models/tabla.model')
const ligas = require('../models/ligas.model')
const equiposliga = require('../models/quiposLiga.model')
const pdfkit = require('pdfkit');
const fs = require('fs');


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
                var nombreEquipo = '';

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

                if(parametros.equipo1 >> parametros.equipo2){

                    var nombreEquipo = 'equipo1'

                    console.log('el ganador es el  ' + nombreEquipo)

                }else{
                    var nombreEquipo = 'equipo2'

                    console.log('el ganador es el  ' + nombreEquipo)
                }

                modeloTabla.nombreLiga = parametros.nombreLiga
                modeloTabla.jornadas = numeroJornada;
                modeloTabla.partidos = numeroPartidos;
                modeloTabla.equipo1 = parametros.equipo1;
                modeloTabla.equipo2 = parametros.equipo2;
                modeloTabla.ganador = nombreEquipo;

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



function obtenertabla(req, res){

    const pdfDocument = new pdfkit()
    pdfDocument.pipe(fs.createWriteStream("Tabla.pdf"));

    var parametros = req.body;

    if(parametros.nombreLiga){
        tabla.find({nombreLiga: parametros.nombreLiga},(err, tablaEncontrada)=>{
            if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
            if(!tablaEncontrada) return res.status(500).send({ mensaje: 'error al encontrar la tabla'})

            let contenido =[]
            for(let i = 0; i< tablaEncontrada.length; i++){
    
                contenido.push(tablaEncontrada[i].nombreLiga+'              '+ 
                tablaEncontrada[i].jornadas+'              '+  
                tablaEncontrada[i].partidos+'               '+
                tablaEncontrada[i].equipo1+'                 '+
                tablaEncontrada[i].equipo2+'               '+
                tablaEncontrada[i].ganador+'\n'+'\n'+'\n')
            }
    
            pdfDocument.text("torneo deportipo de la liga",{
                align: 'center',
            })
    
            pdfDocument.text('   ',{
                align: 'center',
            })
    
            pdfDocument.text("Liga      jornadas       partidos    equipo1      equipo2        ganador",{
                //align: 'center',
            })
    
    
            pdfDocument.text("-----------------------------------------------------------------------------------------------",{
                align: '',
            })
    
            pdfDocument.text(contenido,{
                align: '',
                fit: [250,300],           
          })
    
         
    
          pdfDocument.end()



            return res.status(500).send({tabla:tablaEncontrada })
        })
    }
}



module.exports = {
    tablafunc,
    obtenertabla
}