// IMPORTACIONES
const express = require('express');
const cors = require('cors');
var app = express();

/* // IMPORTACIONES RUTAS */
/* const UsuarioRutas = require('./src/routes/usuario.routes'); */
const EmpresaRutas = require('./src/routes/empresa.routes')
const SucursalesRutas = require('./src/routes/sucursal.routes')
const ProductosRutas = require('./src/routes/producto.routes')
const SucursalUni = require('./src/routes/sucursalUni.router')

// MIDDLEWARES -> INTERMEDIARIOS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/obtenerProductos
app.use('/api',EmpresaRutas, SucursalesRutas, ProductosRutas, SucursalUni);


module.exports = app;