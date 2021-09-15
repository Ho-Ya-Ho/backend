const Sequelize = require("sequelize");

module.exports = ((sequelize,DataTypes)=>{
    return sequelize.define('test', {
        nickname:{
            type: Sequelize.STRING(40),
            allowNull: false,
            unique: true,
        },
        likeFood: {
            type: Sequelize.STRING(1024),
            allowNull: true,
        },
        dislikeFood: {
            type: Sequelize.STRING(1024),
            allowNull: true,
        },
    },{
        timestamps: false,
    })
})