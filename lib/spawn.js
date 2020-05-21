const crossSpawn = require('cross-spawn');

module.exports = function spawn(config, tasks, forwardOptions) {
  tasks.forEach(task => {
    const args = ['run', task, ...forwardOptions];
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
