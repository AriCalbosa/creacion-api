module.exports = function (sequelize, DataTypes) {

    let alias = 'Movie'

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        awards: {
            type: DataTypes.INTEGER
        },
        rating: {
            type: DataTypes.DOUBLE
        },
        length: {
            type: DataTypes.INTEGER
        },
        genre_id: {
            type: DataTypes.INTEGER
        },
        release_date: {
            type: DataTypes.DATE
        }
    }
    
    let config = {
        tableName: 'movies',
        timestamps: false
    }
    
    const Movie = sequelize.define (alias, cols, config);

    Movie.associate = models => {
        Movie.belongsTo(models.Genre, {
            as: 'genre',
            foreignKey: 'genre_id'
        });
        Movie.belongsToMany(models.Actor, {
            as: 'actors',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        });
    }
    
    return Movie;
}