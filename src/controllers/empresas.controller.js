const Empresa = require('../models/empresas.model')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


function RegistrarAdmin(req, res) {

    var usuarioModel = new Empresa();

    usuarioModel.nombreEmpresa = 'SuperAdmin';
    usuarioModel.tipoEmpresa = null;
    usuarioModel.email = 'SuperAdmin';
    usuarioModel.rol = 'ADMIN';


    Empresa.find({ email: usuarioModel.email }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length == 0) {

            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                usuarioModel.password = passwordEncriptada;

                usuarioModel.save((err, usuarioGuardado) => {
                    if (err) return res.status(500)
                        .send({ mensaje: 'Error en la peticion' });
                    if (!usuarioGuardado) return res.status(500)
                        .send({ mensaje: 'Error al agregar el Usuario' });

                    return res.status(200).send({ usuario: usuarioGuardado });
                });
            });
        } else {
            return res.status(500)
                .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
        }
    })

}


function Login(req, res) {
    var parametros = req.body;
    Empresa.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (usuarioEncontrado) {
            bcrypt.compare(parametros.password, usuarioEncontrado.password,
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        if (parametros.obtenerToken === 'true') {
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        }


                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide' });
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.' })
        }
    })
}


function agregarEmpresa(req, res) {

    var parametros = req.body;
    const modeloEmpresa = Empresa();

        modeloEmpresa.nombreEmpresa = parametros.nombreEmpresa;
        modeloEmpresa.tipoEmpresa = parametros.tipo;
        modeloEmpresa.email = parametros.email
        modeloEmpresa.password = parametros.password;
        modeloEmpresa.rol = 'EMPRESA'
    
        Empresa.findOne({ nombreEmpresa: parametros.nombreEmpresa }, (err, empresaEncontrada) => {
            if (err) return res.status(400).send({ mensaje: 'erroe en la peticion' })
            if (!empresaEncontrada) {
    
                
    
                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    modeloEmpresa.password = passwordEncriptada;
    
                    modeloEmpresa.save((err, usuarioGuardado) => {
                        if (err) return res.status(400)
                            .send({ mensaje: 'Error en la peticion' });
                        if (!usuarioGuardado) return res.status(500)
                            .send({ mensaje: 'Error al agregar el Usuario' });
    
                        return res.status(200).send({ usuario: usuarioGuardado });
                    });
                });
            }
            if (empresaEncontrada) return res.status(500).send({ mensaje: 'la Empresa ya Existe' })
    
        })



}

function editarEmpresa (req, res){

    var parametros = req.body;
    var idEmpre = req.params.idempresa;

   Empresa.findByIdAndUpdate(idEmpre, parametros,{new: true},(err, empresaEaditada)=>{
       if(err) return res.status(500).send({ mensaje: 'Error en la peticion'})
       if(!empresaEaditada) return res.status(500).send({ mensaje: 'error al editar la empresa'})

       return res.status(200).send({ empresa: empresaEaditada})
   })
}

function eliminarEmpresa(req, response){

      var idempre = req.params.idempresa;

      Empresa.findByIdAndDelete(idempre,(err, empresaEliminada)=>{
            if(err) return response.status(500).send({ mensaje: 'error en la peticion'})
            if(!empresaEliminada) return response.status(500).send({ mensaje: 'error al eliminar la empresa'})

            return response.status(200).send({empresa: empresaEliminada})

      })
    }

function obtenerEmpresa(req, res){
    
    Empresa.find({},(err, empresasEncontradas)=>{
        if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
        if(!empresasEncontradas) return res.status(500).send({ mensaje: 'error al obtener empresas'})

        return res.status(200).send({empresas: empresasEncontradas})
    })
}



module.exports = {
    agregarEmpresa,
    editarEmpresa,
    eliminarEmpresa,
    obtenerEmpresa,
    RegistrarAdmin,
    Login
}