var quiz = require('./snowman');
var yargs = require('yargs');

var flags = yargs.usage('$0: Usage node app.js --run --diff [easy/hard]')
  .options('h', {
    alias: 'help',
    describe: 'Display Help'
  })
  .options('r', {
    alias: 'run',
    describe: 'Run the App.',
  })
  .options('d', {
    alias: 'diff',
    describe: 'Set the difficulty of the Snowman. Ex. easy for 3 char word or hard for 5 char word',
  })
  .argv;

if (flags.help) {
  yargs.showHelp();
  process.exit(0);
}

if (flags.run) {
  quiz.run(flags.diff);
}