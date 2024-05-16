import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Card = sequelize.define('Card', {
  cardNumber: DataTypes.INTEGER,
  expiration: DataTypes.DATE,
  isAuth: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
},{timestamps: true});

