const path = require('path');
const pm = require('picomatch');

function matchTasks(pattern) {
  const packageJsonTasks = Object.keys(require(path.join(process.cwd(), 'package.json')).scripts);
  const isMatch = pm(pattern);

  return packageJsonTasks.filter(task => isMatch(task));
}

module.exports = { matchTasks }
