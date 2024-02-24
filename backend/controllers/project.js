'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: "soy el método o acción test del controlador project"
        });
    },

    saveProject: async function (req, res) {
        try {
            var project = new Project();
            var params = req.body;

            project.name = params.name;
            project.description = params.description;
            project.category = params.category;
            project.year = params.year;
            project.langs = params.langs;
            project.image = null;

            // Para guardar en la base de datos MongoDB usando promesas
            const projectStored = await project.save();

            return res.status(200).send({ project: projectStored });

        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error al guardar el documento' });
        }
    },

    getProject: async function (req, res) {
        try {
            // Obtener el ID del proyecto de los parámetros de la solicitud
            var projectId = req.params.id;

            // Verificar si el ID del proyecto no está presente
            if (!projectId) {
                return res.status(404).send({ message: 'El proyecto no existe' });
            }

            // Utilizar async/await para buscar el proyecto en la base de datos por su ID
            const project = await Project.findById(projectId);

            // Verificar si el proyecto no fue encontrado
            if (!project) {
                return res.status(404).send({ message: 'El proyecto no existe' });
            }

            // Devolver el proyecto encontrado en la respuesta
            return res.status(200).send({ project });
        } catch (error) {
            // Manejar errores en la búsqueda
            console.error(error);
            return res.status(500).send({ message: 'Error al devolver los datos' });
        }
    },

    getProjects: async function (req, res) {
        try {
            // Utilizar async/await para buscar todos los proyectos en la base de datos
            const projects = await Project.find({}).sort('-year').exec(); //Con el sort puedo ordenar la búsqueda

            // Verificar si no hay proyectos
            if (!projects || projects.length === 0) {
                return res.status(404).send({ message: 'No hay proyectos' });
            }

            // Devolver los proyectos encontrados en la respuesta
            return res.status(200).send({ projects });
        } catch (error) {
            // Manejar errores en la búsqueda
            console.error(error);
            return res.status(500).send({ message: 'Error al devolver los proyectos' });
        }
    },

    updatedProject: async function (req, res) {
        try {
            // Obtener el ID del proyecto de los parámetros de la solicitud
            var projectId = req.params.id;
            var update = req.body;

            // Utilizar async/await para actualizar el proyecto en la base de datos por su ID
            const projectUpdated = await Project.findByIdAndUpdate(projectId, update, { new: true });

            // Verificar si el proyecto no existe para actualizar
            if (!projectUpdated) {
                return res.status(404).send({ message: 'No existe el proyecto para actualizar' });
            }

            // Devolver el proyecto actualizado en la respuesta
            return res.status(200).send({ project: projectUpdated });
        } catch (error) {
            // Manejar errores en la actualización
            console.error(error);
            return res.status(500).send({ message: 'Error al actualizar el proyecto' });
        }
    },

    deleteProject: async function (req, res) {
        try {
            // Obtener el ID del proyecto de los parámetros de la solicitud
            var projectId = req.params.id;

            // Utilizar async/await para eliminar el proyecto en la base de datos por su ID
            const projectRemoved = await Project.findByIdAndDelete(projectId);

            // Verificar si el proyecto no existe para eliminar
            if (!projectRemoved) {
                return res.status(404).send({ message: 'No se ha podido eliminar el proyecto' });
            }

            // Devolver el proyecto eliminado en la respuesta
            return res.status(200).send({ project: projectRemoved });
        } catch (error) {
            // Manejar errores en la eliminación
            console.error(error);
            return res.status(500).send({ message: 'No se ha podido borrar el documento' });
        }
    },

    uploadImage: async function (req, res) {
        try {
            var projectId = req.params.id;
            var fileName = 'Imagen no subida';
    
            if (req.files) {
                var filePath = req.files.image.path;
                var fileSplit = filePath.split('\\');
                var fileName = fileSplit[1];
                var exSplit = fileName.split('\.');
                var fileExt = exSplit[1];

                if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                    const projectUpdated = await Project.findByIdAndUpdate(
                        projectId,
                        { image: fileName },
                        { new: true }
                    );
        
                    // Verificar si el proyecto no existe para actualizar
                    if (!projectUpdated) {
                        return res.status(404).send({ message: 'La imagen no existe' });
                    }
        
                    // Devolver el proyecto actualizado en la respuesta
                    return res.status(200).send({
                        project: projectUpdated
                    });
                }else{
                   fs.unlink(filePath, (err) =>{
                    return res.status(200).send({message: 'la extensión no es válida'});
                   });
                }
    
            } else {
                return res.status(200).send({
                    message: fileName
                });
            }
        } catch (error) {
            // Manejar errores en la operación
            console.error(error);
            return res.status(500).send({ message: 'El archivo no se ha subido' });
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/'+ file;

        fs.exists(path_file, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message:"No existe la imagen..."
                });

            }
        })
    }
    

};

module.exports = controller; // Esto para devolver los métodos de arriba
