const fs = require('fs/promises');

async function compareFileOperations(sourceFileName, text) {
  try {
    const readPromise = fs.readFile(sourceFileName, 'utf-8');
    const writePromise = fs.writeFile(
      './spec/data/test-3.txt',
      text,
    );
    const result = await Promise.race([readPromise, writePromise]);

    if (result === undefined) {
      return 'Запись быстрее';
    }
    return 'Чтение быстрее';
  } catch (error) {
    return error;
  }
}

async function getJokes(countJoke) {
  try {
    const jokePromises = Array.from({ length: countJoke }, async () => {
      // fetch как утилита
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      return data.value;
    });

    const jokes = await Promise.all(jokePromises);
    return jokes;
  } catch (error) {
    return error;
  }
}

async function processFiles() {
  try {
    const data1 = await fs.readFile('spec/data/input-1.txt', 'utf-8');
    const data2 = await fs.readFile('spec/data/input-2.txt', 'utf-8');
    const data3 = await fs.readFile('spec/data/input-3.txt', 'utf-8');

    const numbers1 = data1.split(', ').map(Number);
    const numbers2 = data2.split(', ').map(Number);
    const numbers3 = data3.split(', ').map(Number);

    const sum1 = numbers1.reduce((acc, num) => acc + num, 0);
    const sum2 = numbers2.reduce((acc, num) => acc + num, 0);
    const sum3 = numbers3.reduce((acc, num) => acc + num, 0);

    await fs.writeFile('output-1.txt', `Сумма чисел в input-1.txt: ${sum1}`);
    await fs.writeFile('output-2.txt', `Сумма чисел в input-2.txt: ${sum2}`);
    await fs.writeFile('output-3.txt', `Сумма чисел в input-3.txt: ${sum3}`);

    console.log('Результаты сохранены в output1.txt, output2.txt, и output3.txt');
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}
module.exports = {
  getJokes,
  processFiles,
  compareFileOperations,
};
