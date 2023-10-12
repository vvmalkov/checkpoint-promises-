const fs = require('fs/promises');
const {
  getJokes,
  processFiles,
  totalFromFile,
} = require('../index');

describe('getJokes', () => {
  it('Использует функцию generateJoke', async () => {
    const jetJokesString = getJokes.toString();
    expect(jetJokesString).toMatch(/generateJoke\(/);
  });
  it('Возвращает массив из 5 шуток', async () => {
    const jokes = await getJokes();
    console.log(jokes);
    expect(Array.isArray(jokes)).toBe(true);
    expect(jokes.length).toBe(5);
    jokes.forEach((joke) => {
      expect(typeof joke).toBe('string');
    });
  });
});

describe('totalFromFile', () => {
  it('Находит сумму чисел в файле input-1.txt', async () => {
    const result = await totalFromFile('./spec/data/input-1.txt');
    expect(result).toBe(15);
  });
  it('Находит сумму чисел в файле input-2.txt', async () => {
    const result = await totalFromFile('./spec/data/input-2.txt');
    expect(result).toBe(40);
  });
});

describe('processFiles', () => {
  beforeEach(async () => {
    await processFiles();
  });
  it('суммирует числа из файлов в папке data и записывает результат в файл output.txt', async () => {
    const data = await fs.readFile('output.txt', 'utf-8');
    expect(data).toBe('120');
  });
  it('использует функцию totalFromFile', async () => {
    const processFilesString = processFiles.toString();
    expect(processFilesString).toMatch(/totalFromFile\(/);
  });
});
