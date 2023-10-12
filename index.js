const fs = require('fs/promises');
const generateJoke = require('./generateJoke');

module.exports = {
  getJokes,
  processFiles,
  totalFromFile,
};
