const express = require('express');
const controlarSucursal = require('../controllers/productosSucursales.controller')


const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')

const api = express.Router();



api.get('/obtenerProductoSucur/:idsucursal',[md_autenticacion.Auth, md_roles.verEmpresa], controlarSucursal.obtenerProducto)
api.post('/vender',[md_autenticacion.Auth, md_roles.verEmpresa], controlarSucursal.ventaP)


module.exports = api;