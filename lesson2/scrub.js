const fs = require('fs');
const mst = require('minimist');

const time = new Date();
const scrub = Math.round(Math.random());

let q = '';
if (scrub == 0) {
    q = 'eagle';
} else if (scrub == 1) {
    q = 'head';
}

const argv = mst(process.argv.slice(2), {
    alias: {
        eagle: '-e',
        head: '-h'
    }
});

let answer = '';
if (argv['e'] == true) {
    answer = 'eagle';
} else if (argv['h'] == true) {
    answer = 'head';
}

result = q == answer ? `Угадал! Ответ ${q}` : `Облом :( Правильный ответ ${q}`;

fs.appendFile("./log.txt", time + '---' + result + "\r\n", function(res) {
    console.log(`${result}. Результат с ответом "${answer}" записан в файл log.txt`);
});