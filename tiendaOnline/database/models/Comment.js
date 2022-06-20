module.exports = (sequelize, dataTypes) => {
    let alias = "Comment";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false
        },
        texto_cometario: {
            type: dataTypes.STRING,
            allowNull: false
        },
        usuario_id: {
            type: dataTypes.INTEGER,
            allowNull: false

        },
        libro_id: {
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
        tableName: 'comentarios',
        underscored: true

    }
    const Comment = sequelize.define(alias, cols, config)
    Comment.associete = function (model) {
        Comment.belongsTo(model.User, {
            as: 'usuarios',
            foreignKey: 'usuario_id'

        }),
        Comment.belongsTo(model.Book, {
            as: 'libros',
            foreignKey: 'libro_id'

        })


    }
    return Comment;
}
