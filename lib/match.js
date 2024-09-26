const path = require('path');
const pm = require('picomatch');

function matchTasks(pattern) {
  const cwd = process.cwd();
  const projectCwd = process.env.PROJECT_CWD;

  const isMatch = pm(pattern);
  const matchingTasks = [];

  for (let task of getDirTasks(cwd)) {
    if (isMatch(task)) {
      matchingTasks.push(task);
    }
  }

  // Yarn allows tasks with a colon (:) to be be shared across workspaces
  // https://yarnpkg.com/getting-started/qa#how-to-share-scripts-between-workspaces
  // If the current dir is NOT the project root, search the root for the task too
  if (projectCwd && projectCwd !== cwd) {
    for (let task of getDirTasks(projectCwd)) {
      if (task.indexOf(':') !== -1 && isMatch(task)) {
        matchingTasks.push(task);
      }
    }
  }

  return matchingTasks;
}

function getDirTasks(dir) {
  return Object.keys(require(path.join(dir, 'package.json')).scripts);
}

module.exports = { matchTasks }
