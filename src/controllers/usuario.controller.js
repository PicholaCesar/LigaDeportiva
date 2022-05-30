/* const Usuario = require('../models/usuario.model');
const Empresa = require('../models/empresas.model')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


function RegistrarAdmin(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();


    usuarioModel.nombre = 'SuperAdmin';
    usuarioModel.apellido = 'SuperAdmin';
    usuarioModel.email = 'SuperAdmin';
    usuarioModel.rol = 'ADMIN';
    usuarioModel.imagen = null;

    Usuario.find({ email: usuarioModel.email }, (err, usuarioEncontrado) => {
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

    Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
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
            
            Empresa.findOne({ email: parametros.email},(err, emailEncotrado)=>{
                if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
                if(emailEncotrado) {
                    console.log("el correo si existe empresa")

                    bcrypt.compare(parametros.password, emailEncotrado.password,
                        (err, verificacionPassword) => {
                            if (verificacionPassword) {
                                if (parametros.obtenerToken === 'true') {
                                    return res.status(200)
                                        .send({ token: jwt.crearToken(emailEncotrado) })
                                } else {
                                    emailEncotrado.password = undefined;
                                    return res.status(200)
                                        .send({ usuario: usuarioEncontrado })
                                }
        
        
                            } else {
                                return res.status(500)
                                    .send({ mensaje: 'Las contrasena no coincide' });
                            }
                        })


                }else{
                    return res.status(500).send({ mensaje: 'el correo no existe'})
                }
            })
        }
    })
}



module.exports = {

    RegistrarAdmin,
    Login
    
} */