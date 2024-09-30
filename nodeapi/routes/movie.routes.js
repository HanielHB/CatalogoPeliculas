module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/movie.controller.js");

    router.get('/', controller.listMovie);
    router.get('/:id', controller.getMovieById);
    router.post('/', controller.createMovie);
    router.put('/:id', controller.updateMoviePut);
    router.patch('/:id', controller.updateMoviePatch);
    router.delete('/:id', controller.deleteMovie);
    router.post('/:id/foto', controller.uploadPicture);
    router.get('/movies/:id/actors', controller.getMovieActors);


    
    app.use('/movies', router);

};