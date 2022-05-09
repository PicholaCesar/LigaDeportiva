const express = require('express')
const controladorLiga = require('../controllers/ligas.controller');

const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarliga', [md_autenticacion.Auth, md_roles.verAdmin], controladorLiga.agregarLiga)
api.put('/editarliga/:idliga',[md_autenticacion.Auth, md_roles.verAdmin],controladorLiga.editarliga)
api.delete('/eliminarliga/:idliga',[md_autenticacion.Auth, md_roles.verAdmin], controladorLiga.eliminarliga)
api.get('/obtenerligas',[md_autenticacion.Auth, md_roles.verAdmin], controladorLiga.obtenerligas)
module.exports = api;

