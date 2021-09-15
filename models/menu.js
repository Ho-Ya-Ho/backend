const Sequelize = require("sequelize");

module.exports = ((sequelize,DataTypes)=>{
    return sequelize.define('menu', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        food :{
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: true,
        }
    },{
        timestamps: false,
    })
});