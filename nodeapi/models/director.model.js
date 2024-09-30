module.exports = (sequelize, Sequelize) => {
    const Director = sequelize.define("director", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Director;
};
