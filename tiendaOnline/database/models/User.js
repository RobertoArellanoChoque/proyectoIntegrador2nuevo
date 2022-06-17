
module.exports = (sequelize, dataTypes) => {
    let alias = "User";
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
        },
        apellido: {
            type: dataTypes.STRING,
            allowNull: false
        },
        username: {
            type: dataTypes.STRING,
            allowNull: false
        },
        fecha_de_nacimiento: {
            type: dataTypes.DATE,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true

        },
        clave: {
            type: dataTypes.STRING,
            allowNull: false
        },
        img: {
            type: dataTypes.STRING,
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
        tableName: 'usuarios',
        underscored: true

    }
    const User = sequelize.define(alias, cols, config)
    User.associete = function (model) {
        User.belongsTo(model.Comment, {
            as: 'comentarios',
            foreignKey: 'usuario_id'
        }),
        User.hasMany(model.Book, {
            as: 'libros',
            foreignKey: 'usuario_id'
        })
    }
    return User;
}
