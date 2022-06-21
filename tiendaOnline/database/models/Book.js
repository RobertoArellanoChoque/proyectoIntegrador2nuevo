

module.exports = (sequelize, dataTypes) => {
    let alias = "Book";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        titulo: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.TEXT,
        },
        img: {
            type: dataTypes.STRING,
      
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: false
        },
        usuario_id: {
            type: dataTypes.INTEGER,
            

        },
        comentario_id: {
            type: dataTypes.STRING,
       
        },
    }
    let config = {
        tableName: 'libros',
        underscored: true,
        timesstamps: true
    }
    
    const Book = sequelize.define(alias, cols, config)

    Book.associate = function(models){
        Book.belongsTo(models.User, {
            as: 'usuarios',
            foreignKey: 'usuario_id'
        });  
        Book.hasMany(models.Comment, {
            as: 'comentarios',
            foreignKey: 'libro_id'
        })    
    }
    return Book;
    
}