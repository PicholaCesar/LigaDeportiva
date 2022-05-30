const express = require('express');
const controladorProducto = require('../controllers/productos.controller')

const md_autenticacion = require('../middlewares/autenticacion')
const md_roles = require('../middlewares/roles')

const api = express.Router();

api.post('/agregarproducto',[md_autenticacion.Auth, md_roles.verEmpresa], controladorProducto.agregarProducto)
api.get('/obteberproduc/:idproducto', controladorProducto.obtenerProdictID)
api.put('/editarproducto/:idproducto',[md_autenticacion.Auth, md_roles.verEmpresa], controladorProducto.editarProducto)
api.get('/obtenerproducto',[md_autenticacion.Auth, md_roles.verEmpresa], controladorProducto.obtenerProductos)
api.delete('/eliminarproducto/:idproducto',[md_autenticacion.Auth, md_roles.verEmpresa], controladorProducto.eliminarProducto)
api.post('/enviarproducto',[md_autenticacion.Auth, md_roles.verEmpresa], controladorProducto.enviarProducto)

module.exports = api;