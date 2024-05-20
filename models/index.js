//import { foreignKey } from 'sequelize/lib/query-types';
import {Card} from './card.js';
import {User} from './user.js';
import { Blacklist } from './userBlackList.js';
import {Transaction} from './transaction.js';


User.hasMany(Card, { foreignKey: {name: 'userId'}})
Card.belongsTo(User, { foreignKey: {name: 'userId'}})

Transaction.belongsTo(Card, { foreignKey: {name: 'cardId'} })
Card.hasMany(Transaction, { foreignKey: {name: 'cardId'}})

export { Card, User, Transaction, Blacklist }
