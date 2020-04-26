const help = require('./help');
const version = require('./version');
const { parseArgs, parseOptions } = require('./parse');
const spawn = require('./spawn');

const args = process.argv.slice(2);
const { options, tasks, forwardOptions } = parseArgs(args);

if (options.includes('-v') || options.includes('--version')) {
  version();
}
if (options.includes('-h') || options.includes('--help') || !tasks.length) {
  help();
}

const config = parseOptions(options);
spawn(config, tasks, forwardOptions);
