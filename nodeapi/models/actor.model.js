module.exports = (sequelize, Sequelize) => {
    const Actor = sequelize.define("actor", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Actor;
};
