const fs = require('fs');
const mst = require('minimist');
const readline = require('readline');
const argv = mst(process.argv.slice(2));

const lr = readline.createInterface({
    input: fs.createReadStream('./lesson2/21_log.txt'),
    output: process.stdout,
    console: false
});

let stats = {
    games: 0,
    player_wins: 0,
    cpu_wins: 0
};

let games = 0;
let player_wins = 0;
let cpu_wins = 0;

lr.on('line', function(line) {
    line = line.toLowerCase();
    games++;

    if (line.includes('игрок') && line.includes('победил')) {
        player_wins++;
    } else if (line.includes('игрок') && line.includes('проиграл')) {
        cpu_wins++;
    } else if (line.includes('компьютер') && line.includes('победил')) {
        cpu_wins++;
    } else if (line.includes('компьютер') && line.includes('проиграл')) {
        player_wins++;
    }
});

const result = `Игр проведено: ${games}.
Игрок победил ${player_wins} раз.
Компьютер победил ${cpu_wins} раз.
`;

fs.appendFile("./lesson2/21_stats.txt", result + "\r\n", function(res) {
    console.log(`Статистика записана в файл 21_stats.txt`);
});