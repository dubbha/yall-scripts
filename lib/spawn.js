const path = require('path')
const crossSpawn = require('cross-spawn');

module.exports = function spawn(config, tasks, forwardOptions) {
  const preArgs = config.workspaces
    ? buildWorkspacePreArgs(config.parallel, config.quiet)
    : [];

  tasks.forEach(task => {
    const args = [...preArgs, 'run', task, ...forwardOptions];
    const options = { stdio: 'inherit' };

    if (config.parallel) {
      const child = crossSpawn('yarn', args, options);

      child.on('close', code => {
        if (code > 0) {
          process.exit(code);
        }
      });
    } else {
      const { status } = crossSpawn.sync('yarn', args, options);
      if (status > 0) {
        process.exit(status);
      }
    }
  })
}

function buildWorkspacePreArgs(parallel, quiet) {
  const rootPkgDir = process.env.PROJECT_CWD;
  const preArgs = ['workspaces', 'foreach'];

  if (parallel) {
    preArgs.push('--parallel', '--interlaced');
  }

  if (!quiet) {
    preArgs.push('--verbose');
  }

  // Yarn's foreach stupidly includes the root package. Explicitly exclude it.
  if (rootPkgDir) {
    const rootPkgName = require(path.join(rootPkgDir, 'package.json')).name;
    if (!rootPkgName) {
      throw new Error('Workspaces root must have package name');
    }
    preArgs.push('--exclude', rootPkgName);
  }

  return preArgs;
}
