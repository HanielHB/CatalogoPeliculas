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
exports.listMovie = async (req, res) => {
    try {
        const movies = await db.movies.findAll({
            include: [{ model: db.directors, as: 'movieDirector' }, 
                { model: db.actors, as: 'cast' }
            ]
        });
        res.json(movies);
    } catch (error) {
        sendError500(error);
    }
}

exports.getMovieActors = async (req, res) => {
    const { id } = req.params;  
    
    try {
        const movie = await db.movies.findByPk(id, {
            include: [
                { 
                    model: db.directors, 
                    as: 'movieDirector'  
                },
                { 
                    model: db.actors, 
                    as: 'cast'  
                }
            ]
        });

        if (!movie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        res.json(movie);
    } catch (error) {
        sendError500(res, error);
    }
};



exports.getMovieById = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await getMovieOr404(id, res);
        if (!movie) {
            return;
        }
        res.json(movie);
    } catch (error) {
        sendError500(error);
    }
}

exports.createMovie = async (req, res) => {

    const requiredFields = ['title', 'synopsis', 'releaseDate', 'rottenTomatoesRating', 'trailerUrl', 'directorId'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {

        const movie = {
            title: req.body.title,
            synopsis: req.body.synopsis,
            releaseDate: req.body.releaseDate,
            rottenTomatoesRating: req.body.rottenTomatoesRating,
            trailerUrl: req.body.trailerUrl,
            directorId: req.body.directorId
        }
        const movieCreada = await db.movies.create(movie);

        res.status(201).json(movieCreada);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateMoviePatch = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await getMovieOr404(id, res);
        if (!movie) {
            return;
        }
        movie.title = req.body.title || movie.title;
        movie.synopsis = req.body.synopsis || movie.synopsis;
        movie.releaseDate = req.body.releaseDate || movie.releaseDate;
        movie.rottenTomatoesRating = req.body.rottenTomatoesRating || movie.rottenTomatoesRating;
        movie.trailerUrl = req.body.trailerUrl || movie.trailerUrl;
        movie.directorId = req.body.directorId || movie.directorId;
        
        await db.movies.update(movie, {
            where: { id: id }
        });
        res.json(movie);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateMoviePut = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await getMovieOr404(id, res);
        if (!movie) {
            return;
        }
        const requiredFields = ['title', 'synopsis', 'releaseDate', 'rottenTomatoesRating', 'trailerUrl', 'directorId'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        movie.title = req.body.title
        movie.synopsis = req.body.synopsis
        movie.releaseDate = req.body.releaseDate
        movie.rottenTomatoesRating = req.body.rottenTomatoesRating
        movie.trailerUrl = req.body.trailerUrl
        movie.directorId = req.body.directorId

        await db.movies.update(movie, {
            where: { id: id }
        });
        res.json(movie);
    } catch (error) {
        sendError500(error);
    }
}


exports.deleteMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await getMovieOr404(id, res);
        if (!movie) {
            return;
        }
        await movie.destroy();
        res.json({
            msg: 'movie eliminada correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}


exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await getMovieOr404(id, res);
        if (!movie) {
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
            return;
        }
        const file = req.files.fotoPerfil;
        const fileName = movie.id + '.jpg';
        file.mv(`public/movie/${fileName}`);
        await movie.save();
        res.json(movie);
    } catch (error) {
        sendError500(error);
    }
}

async function getMovieOr404(id, res) {
    const movie = await db.movies.findByPk(id);
    if (!movie) {
        res.status(404).json({
            msg: 'movie no encontrada'
        });
        return;
    }
    return movie;
}


