module.exports = (sequelize, dataTypes) => {
    let alias = "Genre";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: 'generos',
        underscored: true

    }
    const Genre = sequelize.define(alias, cols, config)
    Genre.associate = function (models) {
        Genre.hasMany(models.Book, {
            as: 'libros',
            foreignKey: 'genero_id'
        });

    }
    return Genre;
}
