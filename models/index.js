//import { foreignKey } from 'sequelize/lib/query-types';
import {Card} from './card.js';
import {User} from './user.js';

User.hasMany(Card, { foreignKey: {name: 'card_number'}})
Card.belongsTo(User, { foreignKey: {name: 'card_number'}})

export { Card, User }