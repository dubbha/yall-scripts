const { matchTasks } = require('./match')

function parseArgs(args) {
  const optionRe = /^-{1,2}[A-z]+$/;
  const options = [];
  const tasks = [];
  const forwardOptions = [];
  let pointer = 0; // current group being parsed: [0] options > [1] tasks > [2] forwardOptions

  args.forEach((arg) => {
    if (!pointer && arg.match(optionRe)) {
      options.push(arg);
    } else {
      pointer = !pointer ? 1 : pointer;
      if (pointer === 1 && !arg.match(optionRe)) {
        tasks.push(...matchTasks(arg));
      } else {
        pointer = 2;
        forwardOptions.push(arg);
      }
    }
  })

  return { options, tasks, forwardOptions };
}

function parseOptions (options) {
  const partialConfigs = {
    parallel:   { parallel: true },
    serial:     { parallel: false },
  };

  const defaultConfig = { ...partialConfigs.serial };

  const optionToPartialConfigMap = {
    '-p':             partialConfigs.parallel,
    '--parallel':     partialConfigs.parallel,
    '-s':             partialConfigs.serial,
    '--serial':       partialConfigs.serial,
    '--sequence':     partialConfigs.serial,
    '--sequential':   partialConfigs.serial,
  };
  const expectedOptions = Object.keys(optionToPartialConfigMap);

  return options.reduce(
    (config, option) => {
      if (!expectedOptions.includes(option)) {
        throw new Error(`Invalid option: ${option}`);
      }
      return { ...config, ...optionToPartialConfigMap[option] };
    },
    { ...defaultConfig },
  );
}

module.exports = { parseArgs, parseOptions }
