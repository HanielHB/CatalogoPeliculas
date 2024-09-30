module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movie", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        synopsis: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        releaseDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        rottenTomatoesRating: {
            type: Sequelize.FLOAT, // Calificación de Rotten Tomatoes
            allowNull: false
        },
        trailerUrl: {
            type: Sequelize.STRING, // URL del tráiler de YouTube
            allowNull: false
        },
        directorId: {
            type: Sequelize.INTEGER
        }
    });

    return Movie;
};
