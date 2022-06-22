
module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING,
           
        },
        apellido: {
            type: dataTypes.STRING,
            
        },
        documento: {
            type: dataTypes.INTEGER,
            
        },
        fecha_de_nacimiento: {
            type: dataTypes.DATE,
            allowDefault: true
        },
        email: {
            type: dataTypes.STRING,

        },
        clave: {
            type: dataTypes.STRING,
            
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
    }
    let config = {
        tableName: 'usuarios',
        underscored: true,
        timestamps: true

    }
    const User = sequelize.define(alias, cols, config)
    User.associate = function (models) {
        User.hasMany(models.Comment, {
            as: 'comentarios',
            foreignKey: 'usuario_id'
        }),
        User.hasMany(models.Book, {
            as: 'libros',
            foreignKey: 'usuario_id'
        })
    }
    return User;
}
