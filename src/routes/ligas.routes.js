const express = require('express')
const controladorLiga = require('../controllers/ligas.controller');

const controladorEquipo = require('../controllers/equipo.controller');


//comprobar

const controladorequipoaliga = require('../controllers/equiposporLiga.controller')


const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles');

const api = express.Router();

//admin

api.post('/agregarliga', [md_autenticacion.Auth, md_roles.verAdmin], controladorLiga.agregarLiga)
api.put('/editarliga/:idliga',[md_autenticacion.Auth, md_roles.verAdmin],controladorLiga.editarliga)
api.delete('/eliminarliga/:idliga',[md_autenticacion.Auth, md_roles.verAdmin], controladorLiga.eliminarliga)
api.get('/obtenerligas',[md_autenticacion.Auth, md_roles.verAdmin], controladorLiga.obtenerligas);


//users

api.post('/agregarligauser', [md_autenticacion.Auth, md_roles.verUsuario], controladorLiga.addligaUser);
api.put('/actualizarligauser/:idliga',[md_autenticacion.Auth, md_roles.verUsuario], controladorLiga.updateligaUser);
api.delete('/eliminarligauser/:idliga',[md_autenticacion.Auth, md_roles.verUsuario], controladorLiga.deleteLigaUser);
api.get('/obtenerligasuser',[md_autenticacion.Auth, md_roles.verUsuario], controladorLiga.getLigaUser)


//equipos

api.post('/agregarEquipo',[md_autenticacion.Auth], controladorEquipo.agregarEquipo)



//agregarEquiposliga

api.post('/agregarEquipoaliga', md_autenticacion.Auth,controladorequipoaliga.agregarEquipoLiga)


module.exports = api;