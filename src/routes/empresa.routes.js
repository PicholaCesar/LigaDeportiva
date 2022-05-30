const express = require('express');
const controladorEmpresa = require('../controllers/empresas.controller')



const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles')


const api = express.Router();



api.post('/registraradmin', controladorEmpresa.RegistrarAdmin);
api.post('/login', controladorEmpresa.Login);
api.post('/agregarempresa', controladorEmpresa.agregarEmpresa)
api.put('/editarempresa/:idempresa',[md_autenticacion.Auth, md_roles.verAdmin], controladorEmpresa.editarEmpresa)
api.delete('/eliminarEmpresa/:idempresa',[md_autenticacion.Auth, md_roles.verAdmin], controladorEmpresa.eliminarEmpresa)
api.get('/obtenerempreas',[md_autenticacion.Auth, md_roles.verAdmin], controladorEmpresa.obtenerEmpresa)




module.exports = api;