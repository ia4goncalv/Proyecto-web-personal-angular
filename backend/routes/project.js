'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

//PARA PODER SUBIR IMAGENES HAY QUE HACER UN MIDDLEWARE: ESTO ES ALGO QUE SE EJECUTA ANTES DE LA FUNCIÓN.
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updatedProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;

//Luego de hacer todo esto es IMPORTANTE cargar esto en el archivo app.js en archivos dde rutas