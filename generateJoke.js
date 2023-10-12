const fs = require('fs').promises;

async function generateJoke() {
  const data = await fs.readFile('./jokes.txt', 'utf8');
  const jokesList = data.split('\n');
  const jokeIndex = Math.floor(Math.random(0, 1) * jokesList.length);

  return jokesList[jokeIndex];
}

module.exports = generateJoke;
