module.exports = (sequelize, Sequelize) => {
    const MovieActors = sequelize.define("movie_actors", {
        movieId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'movies',  // Hace referencia a la tabla 'movies'
                key: 'id'
            },
            onDelete: 'CASCADE',  // Opcional: Elimina entradas si la película o el actor se elimina
            onUpdate: 'CASCADE'
        },
        actorId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'actors',  // Hace referencia a la tabla 'actors'
                key: 'id'
            },
            onDelete: 'CASCADE',  // Opcional: Elimina entradas si el actor se elimina
            onUpdate: 'CASCADE'
        }
    }, {
        
    });

    return MovieActors;
};
