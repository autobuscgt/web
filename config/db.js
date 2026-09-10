const {Sequelize} = require('sequelize');

module.exports = new Sequelize('demo_ex', 'postgres', '0000', 
    {dialect:'postgres',define:{timestamps:false}});