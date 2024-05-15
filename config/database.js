import { Sequelize } from 'sequelize';
const databaseUrl = process.env.DATABASE_URL;
/*
export const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    },
});

sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been stablished')
})
    .catch((error) => {
    console.error('Unable to connect to database:', error)
});

module.exports = { sequelize, Sequelize };
*/
