module.exports = function version(stdout) {
  const version = require('../package.json').version
  stdout.write(`v${version}\n`)
}