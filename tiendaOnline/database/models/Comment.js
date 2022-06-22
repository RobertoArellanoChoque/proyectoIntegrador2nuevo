module.exports = (sequelize, dataTypes) => {
    let alias = "Comment";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        
        },
        texto_comentario: {
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
            allowNull: true,
            

        },
        libro_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
        },
    }
    let config = {
        tableName: 'comentarios',
        timestamps: true,
        underscored: true

    }
    const Comment = sequelize.define(alias, cols, config)
    Comment.associate = function (models) {
        Comment.belongsTo(models.User, {
            as: 'usuarios',
            foreignKey: 'usuario_id'

        }),
        Comment.belongsTo(models.Book, {
            as: 'libros',
            foreignKey: 'libro_id'

        })


    }
    return Comment;
}
