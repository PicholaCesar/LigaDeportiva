const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


function RegistrarAdmin(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();


    usuarioModel.nombre = 'ADMIN';
    usuarioModel.apellido = 'ADMIN';
    usuarioModel.email = 'ADMIN';
    usuarioModel.rol = 'ADMIN';
    usuarioModel.imagen = null;

    Usuario.find({ email: usuarioModel.email }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length == 0) {

            bcrypt.hash('deportes123', null, null, (err, passwordEncriptada) => {
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
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.' })
        }
    })
}

function RegistrarUsuario(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();

    if (parametros.nombre && parametros.email && parametros.password) {
        usuarioModel.nombre = parametros.nombre;
        usuarioModel.apellido = parametros.apellido;
        usuarioModel.email = parametros.email;
        usuarioModel.rol = parametros.rol;
        usuarioModel.imagen = null;

        Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {
            if (usuarioEncontrado.length == 0) {

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
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
}


function EditarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;

    Usuario.findById(idUser, (error, usuarioEncontrado) => {
        if (error) return res.status(500).send({ mensaje: 'erroor en la peticion' })
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'error al encotrar el usuario' })

        if (usuarioEncontrado.rol !== "ADMIN") {

            Usuario.findByIdAndUpdate(idUser, parametros, { new: true },
                (err, usuarioActualizado) => {
                    if (err) return res.status(500)
                        .send({ mensaje: 'Error en la peticion' });
                    if (!usuarioActualizado) return res.status(500)
                        .send({ mensaje: 'Error al editar el Usuario' });

                    return res.status(200).send({ usuario: usuarioActualizado })
                })
        }else{

            if(idUser == req.user.sub){
                Usuario.findByIdAndUpdate(idUser, parametros, { new: true },
                    (err, usuarioActualizado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Error en la peticion' });
                        if (!usuarioActualizado) return res.status(500)
                            .send({ mensaje: 'Error al editar el Usuario' });
    
                        return res.status(200).send({ usuario: usuarioActualizado })
                    })
            }else{
                return res.status(400).send({mensaje: 'permiso denegado el usuario es ADMIN'})
            }
        }
    })
}

function EliminarUsuario(req, res) {

    var idusuario = req.params.idusuario;

    Usuario.findById(idusuario, (err, usuarioEncotrado) => {

        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioEncotrado) return res.status(500).send({ mensaje: 'Error al obtener el usuario' });

        if (usuarioEncotrado.rol !== "ADMIN") {
            Usuario.findByIdAndDelete(idusuario, (err, usuarioEliminado) => {

                if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                if (!usuarioEliminado) return res.status(500).send({ mensaje: 'error al eliminar usuario' })

                return res.status(200).send({ usuario: usuarioEliminado })
            })

        } else {

            if (idusuario == req.user.sub) {

                Usuario.findByIdAndDelete(idusuario, (err, usuarioEliminado) => {

                    if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
                    if (!usuarioEliminado) return res.status(500).send({ mensaje: 'error al eliminar usuario' })

                    return res.status(200).send({ usuario: usuarioEliminado })
                })

            } else {
                return res.status(500).send({ mensaje: 'no tienes permiso para eliminar un Usuario tipo administrador' })
            }
        }
    })
}

function obtenerUsuario(req, res){

    Usuario.find({},(error, usuariosmostrar)=>{
        if(error) return res.status(500).send({ mensaje: 'error en la peticion'});
        if(!usuariosmostrar) return res.status(500).send({ mensaje: 'erro al obtener los usuarios'});

        return res.status(200).send({ usuario: usuariosmostrar})
    })
}


module.exports = {

    RegistrarAdmin,
    RegistrarUsuario,
    EditarUsuario,
    Login,
    EliminarUsuario,
    obtenerUsuario
}