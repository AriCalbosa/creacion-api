module.exports = function (sequelize, DataTypes) {

    let alias = 'Genre'
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    }
    
    let config = {
        tableName: 'genres',
        timestamps: false
    }
    
    const Genre = sequelize.define (alias, cols, config);

    Genre.associate = models => {
        Genre.hasMany(models.Movie, {
            as: 'movies',
            foreignKey: 'genre_id'
        });
    }
    
    return Genre;
}