import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Card = sequelize.define('Card', {
  expiration: DataTypes.DATE,
  name: DataTypes.STRING,
},{timestamps: true});

