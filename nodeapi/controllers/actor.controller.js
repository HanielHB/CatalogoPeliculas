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
exports.listActor = async (req, res) => {
    try {
        const actors = await db.actors.findAll({
            include: [
                {
                    model: db.movies, 
                    as: 'actedMovies',  // Relación inversa entre actores y películas
                    through: { attributes: [] }  // Esto excluye atributos de la tabla intermedia
                }
            ]
        });
        res.json(actors);
    } catch (error) {
        sendError500(res, error);  // Pasa `res` como primer parámetro y el `error` como segundo
    }
    
}
// En tu controlador del backend
exports.getActorMovies = async (req, res) => {
    const { id } = req.params;
    try {
        const actor = await db.actors.findByPk(id, {
            include: [
                {
                    model: db.movies, 
                    as: 'actedMovies',  // Relación inversa entre actores y películas
                    through: { attributes: [] }  // Esto excluye atributos de la tabla intermedia
                }
            ]
        });

        if (!actor) {
            return res.status(404).json({ error: 'Actor no encontrado' });
        }

        res.json(actor);
    } catch (error) {
        sendError500(res, error);
    }
};


exports.getActorById = async (req, res) => {
    const id = req.params.id;
    try {
        const actor = await getActorOr404(id, res);
        if (!actor) {
            return;
        }
        res.json(actor);
    } catch (error) {
        sendError500(error);
    }
}

exports.createActor = async (req, res) => {

    const requiredFields = ['name'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {

        const actor = {
            name: req.body.name
        }
        const actorCreada = await db.actors.create(actor);

        res.status(201).json(actorCreada);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateActorPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const actor = await getActorOr404(id, res);
        if (!actor) {
            return;
        }
        actor.name = req.body.name || actor.name;
        
        await db.actors.update(actor, {
            where: { id: id }
        });
        res.json(actor);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateActorPut = async (req, res) => {
    const id = req.params.id;
    try {
        const actor = await getActorOr404(id, res);
        if (!actor) {
            return;
        }
        const requiredFields = ['name'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        actor.name = req.body.name

        await db.actors.update(actor, {
            where: { id: id }
        });
        res.json(actor);
    } catch (error) {
        sendError500(error);
    }
}

exports.deleteActor = async (req, res) => {
    const id = req.params.id;
    try {
        const actor = await getActorOr404(id, res);
        if (!actor) {
            return;
        }
        await actor.destroy();
        res.json({
            msg: 'Actor eliminada correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}

exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const actor = await getActorOr404(id, res);
        if (!actor) {
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
            return;
        }
        const file = req.files.fotoPerfil;
        const fileName = actor.id + '.jpg';
        file.mv(`public/actor/${fileName}`);
        await actor.save();
        res.json(actor);
    } catch (error) {
        sendError500(error);
    }
}

async function getActorOr404(id, res) {
    const actor = await db.actors.findByPk(id);
    if (!actor) {
        res.status(404).json({
            msg: 'Actor no encontrada'
        });
        return;
    }
    return actor;
}


