const seedPosts = require('./post-seeds');
const seedComments= require('./comment-seeds');
const userSeeds = require('./user-seeds.js')

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await userSeeds();
  console.log('\n----- USERS SEEDED -----\n');

  await seedPosts();
  console.log('\n----- POSTS SEEDED -----\n');

  await seedComments();
  console.log('\n----- INSTRUMENTS SEEDED -----\n');


  process.exit(0);
};

seedAll();