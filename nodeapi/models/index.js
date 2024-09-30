const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movies = require("./movie.model.js")(sequelize, Sequelize);
db.actors = require("./actor.model.js")(sequelize, Sequelize);
db.directors = require("./director.model.js")(sequelize, Sequelize);
db.movie_Actors = require('./movie_actors')(sequelize, Sequelize);


// Un director puede dirigir varias películas
db.directors.hasMany(db.movies, { as: "directedMovies" });
db.movies.belongsTo(db.directors, {
    foreignKey: "directorId",
    as: "movieDirector" // Cambié el alias de "director" a "movieDirector"
});

// Un actor aparece en varias películas
db.movies.belongsToMany(db.actors, {
    through: db.movie_Actors,  // Usa el modelo `movie_actors` como tabla intermedia
    as: "cast",  // Alias para acceder a los actores desde las películas
    foreignKey: "movieId",
});
db.actors.belongsToMany(db.movies, {
    through: db.movie_Actors,  // Usa el modelo `movie_actors` como tabla intermedia
    as: "actedMovies",  // Alias para acceder a las películas desde los actores
    foreignKey: "actorId",
});

db.movie_Actors.belongsTo(db.movies, {
    foreignKey: 'movieId',
    as: 'movie' // Alias usado para la relación con la tabla movies
});

db.movie_Actors.belongsTo(db.actors, {
    foreignKey: 'actorId',
    as: 'actor' // Alias usado para la relación con la tabla actors
});


module.exports = db;
