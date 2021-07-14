const conn = require('./conn');
const Todo = require('./Todo');

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  await Todo.create({
    taskName: 'Buy dog food',
    assignee: 'Cody',
    difficulty: 'D'
  });

  await Todo.create({
    taskName: 'Take over world',
    assignee: 'Cody',
    difficulty: 'E',
    complete: true
  });

  await Todo.create({
    taskName: 'Easy',
    assignee: 'Cody',
    difficulty: 'E'
  });

  await Todo.create({
    taskName: 'Easy',
    assignee: 'Cody',
    difficulty: 'M'
  });

  console.log(`
    Seeding successful!
  `);
};

module.exports = {
  conn,
  syncAndSeed,
  models: {
    Todo
  }
};
