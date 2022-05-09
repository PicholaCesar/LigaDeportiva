const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');


const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles')

const api = express.Router();

api.post('/registraradmin', usuarioControlador.RegistrarAdmin);
api.post('/login', usuarioControlador.Login);
api.post('/registrarUsuario', [md_autenticacion.Auth, md_roles.verAdmin],usuarioControlador.RegistrarUsuario);
api.delete('/eliminarUsuario/:idusuario', [md_autenticacion.Auth, md_roles.verAdmin], usuarioControlador.EliminarUsuario)
api.put('/editarUsuario/:idUsuario',[md_autenticacion.Auth, md_roles.verAdmin], usuarioControlador.EditarUsuario);
api.get('/verusuario',[md_autenticacion.Auth, md_roles.verAdmin], usuarioControlador.obtenerUsuario)
module.exports = api;