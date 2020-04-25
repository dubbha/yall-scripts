const crossSpawn = require('cross-spawn');

module.exports = function spawn(config, tasks, forwardOptions) {
  tasks.forEach(task => {
    const args = [task, ...forwardOptions];
    const options = { stdio: 'inherit' };

    const child = config.parallel
      ? crossSpawn('yarn', args, options)
      : crossSpawn.sync('yarn', args, options);

    if (config.parallel) {
      child.on('error', (err) => {
        console.log(`ERROR: ${task}, err: ${err}`)
      });

      child.on('close', (code, signal) => {
        console.log(`CLOSE: ${task}, code: ${code}, signal: ${signal}`);
      });
    }
  })
}
