const Sequelize = require('sequelize');

if (process.env.NODE_ENV === 'production') {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite'
    })
    module.exports = sequelize;
}else{
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '../database.sqlite'
    })
    module.exports = sequelize;
}



