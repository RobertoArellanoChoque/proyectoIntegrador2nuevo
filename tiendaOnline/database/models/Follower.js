const db = require(".");

module.exports = (sequelize, dataTypes) => {
    let alias = "Follower";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        usuario_id: {
            type: dataTypes.STRING,
           
        },
    }
    let config = {
        tableName: 'seguidores',
        underscored: true,
        timestamps: false

    }
    const Follower = sequelize.define(alias, cols, config)

    Follower.associate = function(models){
        Follower.belongsTo(models.User,{
            as: 'usuarios',
            foreignKey:'usuario_id',
        })
    }
    
    return Follower;
}