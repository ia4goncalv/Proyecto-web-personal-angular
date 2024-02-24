'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//CARGAR ARCHIVOS DE RUTAS
var project_routes = require('./routes/project');

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //Al momento de publicar la web el * se cambia por la URL de la web
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//RUTAS: escribir las rutas despues de crearlas en routes y después de cargar archivo arriba
app.use('/api', project_routes);


//EXPORTAR
module.exports = app;