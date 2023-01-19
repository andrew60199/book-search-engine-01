const db = require('../config/connection');
const userSeeds = require('./userSeeds.json');
const { User } = require('../models');

db.once('open', async () => {

  await User.create(userSeeds);

  console.log('Users seeded!');
  process.exit(0);
});
