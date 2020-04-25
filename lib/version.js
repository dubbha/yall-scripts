module.exports = function version() {
  const version = require('../package.json').version;
  process.stdout.write(`v${version}\n`);
  process.exit();
}
