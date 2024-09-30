module.exports = app => {
    require('./movie.routes')(app);
    require('./actor.routes')(app);
    require('./director.routes')(app);
    require('./movie_actors.routes')(app);
}