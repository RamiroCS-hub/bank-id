//import { foreignKey } from 'sequelize/lib/query-types';
import {Card} from './card.js';
import {User} from './user.js';

User.hasMany(Card, { foreignKey: {name: 'userId'}})
Card.belongsTo(User, { foreignKey: {name: 'userId'}})

export { Card, User }