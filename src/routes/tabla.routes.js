const express = require('express');


const controladortabla = require('../controllers/tabla.controller')



const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles');


const api = express.Router();

//RUTAS

api.post('/obtebertabla', md_autenticacion.Auth, controladortabla.tablafunc)
api.get('/obtenertablero', md_autenticacion.Auth, controladortabla.obtenertabla)



module.exports = api;