module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/actor.controller.js");

    router.get('/', controller.listActor);
    router.get('/:id', controller.getActorById);
    router.post('/', controller.createActor);
    router.put('/:id', controller.updateActorPut);
    router.patch('/:id', controller.updateActorPatch);
    router.delete('/:id', controller.deleteActor);
    router.post('/:id/foto', controller.uploadPicture);
    router.get('/actors/:id/movies', controller.getActorMovies);

    

    
    app.use('/actors', router);

};