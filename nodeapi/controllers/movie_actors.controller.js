const db = require("../models");
const { isRequestValid, sendError500} = require("../utils/request.utils");
// Estados del servidor
//200 -> ok
//201 -> creado
//400 -> validaciones
//401 -> no autorizado
//403 -> prohibido
//404 -> no encontrado
//500 -> errores del servidor
exports.listMovieActors = async (req, res) => {
    try {
        const movieActors = await db.movie_Actors.findAll({ 
            
            include: [
                {
                    model: db.movies, // Incluye las películas
                    as: 'movie' // Usar el alias que hayas definido en las relaciones
                },
                {
                    model: db.actors, // Incluye los actores
                    as: 'actor' // Usar el alias que hayas definido en las relaciones
                }
            ]
        });
        res.json(movieActors);
    } catch (error) {
        sendError500(error);
    }
}
exports.getmovieActorById = async (req, res) => {
    const id = req.params.id;
    try {
        const movieActor = await getMovieActorOr404(id, res);
        if (!movieActor) {
            return;
        }
        res.json(movieActor);
    } catch (error) {
        sendError500(error);
    }
}

exports.createmovieActor = async (req, res) => {

    const requiredFields = ['actorId', 'movieId'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {

        const movieActor = {
            actorId: req.body.actorId,
            movieId: req.body.movieId
        }
        const movieActorCreada = await db.movie_Actors.create(movieActor);

        res.status(201).json(movieActorCreada);
    } catch (error) {
        sendError500(error);
    }
}
exports.updatemovieActorPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const movieActor = await getMovieActorOr404(id, res);
        if (!movieActor) {
            return;
        }
        movieActor.actorId = req.body.actorId || movieActor.actorId;    
        movieActor.movieId = req.body.movieId || movieActor.movieId;
        
        await db.movie_Actors.update(movieActor, {
            where: { id: id }
        });
        res.json(movieActor);
    } catch (error) {
        sendError500(error);
    }
}
exports.updatemovieActorPut = async (req, res) => {
    const id = req.params.id;
    try {
        const movieActor = await getMovieActorOr404(id, res);
        if (!movieActor) {
            return;
        }
        const requiredFields = ['actorId', 'movieId'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        movieActor.actorId = req.body.actorId
        movieActor.movieId = req.body.movieId

        await db.movie_Actors.update(movieActor, {
            where: { id: id }
        });
        res.json(movieActor);
    } catch (error) {
        sendError500(error);
    }
}


exports.deletemovieActor = async (req, res) => {
    const id = req.params.id;
    try {
        const movieActor = await getMovieActorOr404(id, res);
        if (!movieActor) {
            return;
        }
        await movieActor.destroy();
        res.json({
            msg: 'movieActor eliminada correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}
async function getMovieActorOr404(id, res) {
    const movieActor = await db.movie_Actors.findByPk(id);
    if (!movieActor) {
        res.status(404).json({
            msg: 'movieActor no encontrada'
        });
        return;
    }
    return movieActor;
}


