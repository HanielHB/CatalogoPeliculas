module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/movie_actors.controller.js");

    router.get('/', controller.listMovieActors);
    router.get('/:id', controller.getmovieActorById);
    router.post('/', controller.createmovieActor);
    router.put('/:id', controller.updatemovieActorPut);
    router.patch('/:id', controller.updatemovieActorPatch);
    router.delete('/:id', controller.deletemovieActor);
    

    
    app.use('/movieActors', router);

};