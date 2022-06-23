

module.exports = (sequelize, dataTypes) => {
    let alias = "Book";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
           
        },
        updated_at: {
            type: dataTypes.DATE,
           
        },
        usuario_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
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