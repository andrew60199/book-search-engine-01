const db = require('../config/connection');
const userSeeds = require('./userSeeds.json');
const { User, Book  } = require('../models');

const techData = require('./techData.json');

db.once('open', async () => {
  await Book.deleteMany({});
  await User.deleteMany({});

  await User.create(userSeeds);

  const technologies = await Tech.insertMany(techData);

  console.log('Technologies seeded!');
  process.exit(0);
});
