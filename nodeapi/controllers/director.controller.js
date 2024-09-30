const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");
// Estados del servidor
//200 -> ok
//201 -> creado
//400 -> validaciones
//401 -> no autorizado
//403 -> prohibido
//404 -> no encontrado
//500 -> errores del servidor
exports.listDirector = async (req, res) => {
    try {
        const directors = await db.directors.findAll({
            include: [
                {
                    model: db.movies, // Incluye las películas que dirigió
                    as: 'directedMovies' // Usa el alias que definiste para la relación
                }
            ]
        });
        res.json(directors);
    } catch (error) {
        sendError500(error);
    }
}
exports.getDirectorsById = async (req, res) => {
    const id = req.params.id;
    try {
        const director = await getDirectorOr404(id, res);
        if (!director) {
            return;
        }
        res.json(director);
    } catch (error) {
        sendError500(error);
    }
}

exports.createDirector = async (req, res) => {

    const requiredFields = ['name'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {

        const director = {
            name: req.body.name
        }
        const directorCreada = await db.directors.create(director);

        res.status(201).json(directorCreada);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateDirectorPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const director = await getDirectorOr404(id, res);
        if (!director) {
            return;
        }
        director.name = req.body.name || director.name;
        
        await db.directors.update(director, {
            where: { id: id }
        });
        res.json(director);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateDirectorPut = async (req, res) => {
    const id = req.params.id;
    try {
        const director = await getDirectorOr404(id, res);
        if (!director) {
            return;
        }
        const requiredFields = ['name'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        director.name = req.body.name

        await db.directors.update(director, {
            where: { id: id }
        });
        res.json(director);
    } catch (error) {
        sendError500(error);
    }
}


exports.deleteDirector = async (req, res) => {
    const id = req.params.id;
    try {
        const director = await getDirectorOr404(id, res);
        if (!director) {
            return;
        }
        await director.destroy();
        res.json({
            msg: 'director eliminada correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}

exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const director = await getDirectorOr404(id, res);
        if (!director) {
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
            return;
        }
        const file = req.files.fotoPerfil;
        const fileName = director.id + '.jpg';
        file.mv(`public/director/${fileName}`);
        await director.save();
        res.json(director);
    } catch (error) {
        sendError500(error);
    }
}

async function getDirectorOr404(id, res) {
    const director = await db.directors.findByPk(id);
    if (!director) {
        res.status(404).json({
            msg: 'director no encontrada'
        });
        return;
    }
    return director;
}


