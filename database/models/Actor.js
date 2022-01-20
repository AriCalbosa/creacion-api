module.exports = function (sequelize, DataTypes) {

    let alias = 'Actor'
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        }
    }
    
    let config = {
        tableName: 'actors',
        timestamps: false
    }
    
    const Actor = sequelize.define (alias, cols, config);

    Actor.associate = models => {
        Actor.belongsToMany(models.Movie, {
            as: 'movies',
            through: 'actor_movie',
            foreignKey: 'actor_id',
            otherKey: 'movie_id',
            timestamps: false
        });
    }
    
    return Actor;
}