const fs = require('fs');
const mst = require('minimist');
const readline = require('readline');
const _ = require('lodash');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const book = { // Значения карт в колоде
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    jack: 2,
    queen: 3,
    king: 4,
    ace: 11
};

console.log("Играем в Blackjack. Нажмите Enter для начала или введите 'exit' для выхода");

const cpu_hand = [];
let cpu_hand_sum = 0;

function cpu_take() {
    cpu_hand.push(_.sample(book));
    cpu_hand_sum = cpu_hand.reduce(function(sum, current) {
        return sum + current;
    });
    // console.log("Очки компьютера: " + cpu_hand_sum);
    return cpu_hand_sum;
}

const player_hand = [];
let player_hand_sum = 0;

function player_take() {
    player_hand.push(_.sample(book));
    player_hand_sum = player_hand.reduce(function(sum, current) {
        return sum + current;
    });
    console.log("Ваша сумма очков: " + player_hand_sum);
    return player_hand_sum;
}

let result = "";

function finish() {
    result = ((player_hand_sum > cpu_hand_sum) && (player_hand_sum <= 21) ? `Победил Игрок с суммой ${player_hand_sum}` : `Победил компьютер с суммой ${cpu_hand_sum}`);
    if (player_hand_sum > cpu_hand_sum) {
        if (player_hand_sum <= 21) {
            result = `Победил Игрок с суммой ${player_hand_sum}`;
        } else {
            result = `Игрок перебрал карт на сумму ${player_hand_sum} и проиграл`;
        }
    } else {
        if (cpu_hand_sum <= 21) {
            result = `Победил компьютер с суммой ${cpu_hand_sum}`;
        } else {
            result = `Компьютер перебрал карт на сумму ${cpu_hand_sum} и проиграл`;
        }
    }
    fs.appendFile("./lesson2/21_log.txt", result + "\r\n", function(res) {
        console.log(`${result}. Результат игры записан в файл 21_log.txt`);
        rl.close();
    });
}

rl.on('line', (input) => {
    if ((input == 'exit' || input == 'n') && (cpu_hand_sum >= 21 || player_hand_sum >= 21)) {
        console.log("До свидания!");
        finish();
    } else {
        if (cpu_hand_sum >= 21 || player_hand_sum >= 21) {
            finish();
        } else {
            if (input == 'n') {
                finish();
            } else {
                cpu_take();
                player_take();
                if (player_hand_sum < 21) {
                    console.log("Продолжаем (Enter)? Или введите 'n' для выхода.");
                } else {
                    finish();
                }
            }
        }
    }
});