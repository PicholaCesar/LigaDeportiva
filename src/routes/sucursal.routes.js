const express = require('express');
const controladorSucursales = require('../controllers/sucursales.controller')

const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')

const api = express.Router();

api.post('/agrgarsucursal',[md_autenticacion.Auth, md_roles.verEmpresa], controladorSucursales.agregarSucursales)
api.get('/obtenersucursales',[md_autenticacion.Auth, md_roles.verEmpresa], controladorSucursales.obtenerSucursales)
api.get('/obtenersucursalid/:idsucursal', controladorSucursales.obtenerSucursalesID)
api.put('/editarsucursal/:idsucursal', controladorSucursales.editarSucursales)
api.delete('/eliminarsucursal/:idsucursal',[md_autenticacion.Auth, md_roles.verEmpresa], controladorSucursales.eliminarSucursal)



module.exports = api;