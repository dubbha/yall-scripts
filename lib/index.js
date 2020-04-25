const help = require('./help');
const version = require('./version');
const { parseArgs, parseOptions } = require('./parse');
const spawn = require('./spawn');

const args = process.argv.slice(2);
const { options, tasks, forwardOptions } = parseArgs(args);

if (!tasks.length || options.includes('-h') || options.includes('--help')) {
  help();
}
if (options.includes('-v') || options.includes('--version')) {
  version();
}

const config = parseOptions(options);
spawn(config, tasks, forwardOptions);
