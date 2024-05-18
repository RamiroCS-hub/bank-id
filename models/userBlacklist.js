import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Blacklist = sequelize.define('Blacklist', {
  token: {
    allowNull: false,
    type: DataTypes.STRING
  }
})