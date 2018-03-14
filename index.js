const ansi = require('ansi');

const cursor = ansi(process.stdout);

cursor.beep(); // Doesn't work on Ubuntu. Had to play with ./node_modules/ansi/examples/progress