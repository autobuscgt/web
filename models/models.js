const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    login:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING, validate:{isEmail:true}},
    password:{type:DataTypes.STRING, validate:{min:8}},
    role:{type:DataTypes.ENUM('USER', 'ADMIN'), defaultValue:'USER'},
})

module.exports = { User }