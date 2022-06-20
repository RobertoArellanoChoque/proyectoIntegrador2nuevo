

module.exports = (sequelize, dataTypes) => {
    let alias = "Book";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false
        },
        titulo: {
            type: dataTypes.STRING,
            allowNull: false
        },
        descripción: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        comentario: {
            type: dataTypes.STRING,
            allowNull: false
        },
        genero_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        usuario_id: {
            type: dataTypes.INTEGER,
            allowNull: false,

        },
        img: {
            type: dataTypes.STRING,
            allowNull: false
        },
        valoracion: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: false
        },
    }
    let config = {
        tableName: 'libros',
        underscored: true

    }
    const Book = sequelize.define(alias, cols, config)
    Book.associete = function(model){
        Book.belongsTo(model.Genre, {
            as: 'generos',
            foreignKey: 'genero_id'
        });
        Book.belongsTo(model.User, {
            as: 'usuarios',
            foreignKey: 'usuario_id'
        });  
        Book.belongsTo(model.Book, {
            as: 'comentarios',
            foreignKey: 'libro_id'

        })    
    }
    return Book;
}