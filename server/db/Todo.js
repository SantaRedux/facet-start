const Sequelize = require('sequelize');
const { STRING, ENUM, BOOLEAN } = Sequelize;
const conn = require('./conn');

const Todo = conn.define('todos', {
  taskName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  difficulty: {
    type: ENUM('E','M','D'),
    defaultValue: 'M'
  },
  complete: {
    type: BOOLEAN,
    defaultValue: false
  },
  assignee: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Todo;
