const fs = require('fs/promises');
const {
  compareFileOperations,
  getJokes,
  processFiles,
} = require('../index');

describe('getJokes', () => {
  it('Возвращает массив из 5 шуток c https://api.chucknorris.io/jokes/random', async () => {
    const jokes = await getJokes(5);
    expect(Array.isArray(jokes)).toBe(true);
    expect(jokes.length).toBe(5);
    jokes.forEach((joke) => {
      expect(typeof joke).toBe('string');
    });
  });
});

describe('compareFileOperations', () => {
  it('Возвращает операцию, которая выполнилась быстрее', async () => {
    const result1 = await compareFileOperations('./spec/data/test-1.txt', '');
    expect(result1).toBe('Запись быстрее');
    const result2 = await compareFileOperations('./spec/data/test-1.txt', '.');
    expect(result2).toBe('Чтение быстрее');
  });
});

describe('processFiles', () => {
  beforeEach(async () => {
    await processFiles();
  });
  it('Записывает в 3 файла суммы чисел', async () => {
    const data1 = await fs.readFile('./output-1.txt', 'utf-8');
    const data2 = await fs.readFile('./output-2.txt', 'utf-8');
    const data3 = await fs.readFile('./output-3.txt', 'utf-8');
    expect(data1).toBe('Сумма чисел в input-1.txt: 15');
    expect(data2).toBe('Сумма чисел в input-2.txt: 40');
    expect(data3).toBe('Сумма чисел в input-3.txt: 65');
  });
});
