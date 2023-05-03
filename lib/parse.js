const { matchTasks } = require('./match')

function parseArgs(args) {
  const optionRe = /^-{1,2}[A-z]+$/;
  const options = [];
  const tasks = [];
  const forwardOptions = [];
  let pointer = 0; // current group being parsed: [0] options > [1] tasks > [2] forwardOptions

  args.forEach((arg) => {
    if (!pointer && arg.match(optionRe)) {
      options.push(...expandCharOptions(arg));
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

function parseOptions(options) {
  const partialConfigs = {
    parallel:   { parallel: true },
    serial:     { parallel: false },
    workspaces: { workspaces: true },
    quiet:      { quiet: true },
  };

  const defaultConfig = { ...partialConfigs.serial };

  const optionToPartialConfigMap = {
    '-p':             partialConfigs.parallel,
    '--parallel':     partialConfigs.parallel,
    '-s':             partialConfigs.serial,
    '--serial':       partialConfigs.serial,
    '--sequence':     partialConfigs.serial,
    '--sequential':   partialConfigs.serial,
    '-w':             partialConfigs.workspaces,
    '--workspaces':   partialConfigs.workspaces,
    '-q':             partialConfigs.quiet,
    '--quiet':        partialConfigs.quiet,
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

// converts a string like '-pwq' to ['-p', '-w', '-q']
function expandCharOptions(s) {
  const match = s.match(/^-([A-z]+)$/) // only matches single-dash
  if (match) {
    const letters = match[1];
    const options = [];
    for (let i = 0; i < letters.length; i++) {
      options.push('-' + letters.charAt(i));
    }
    return options;
  }
  return [s];
}

module.exports = { parseArgs, parseOptions }
