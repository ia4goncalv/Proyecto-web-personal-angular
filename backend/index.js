'use strict'
//PARA ESTABLECER CONEXIÓN CON LA BASE DE DATOS MONGODB
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
.then(()=>{
    console.log("conexión bd establecida con éxito");

    //Creación del servidor
    app.listen(port,()=>{
        console.log('Servidor corriendo correctamente en la url localhost:3700')
    });

})
.catch(err=> console.log(err));