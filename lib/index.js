const help = require('./help')
const version = require('./version')

const argv = process.argv.slice(2)
const stdin = process.stdin
const stdout = process.stdout
const stderr = process.stderr

// parse args
switch (argv[0]) {
  case undefined:
  case '-h':
  case '--help':
    help(stdout)
    break
  case '-v':
  case '--version':
    version(stdout)
    break
  default:
    stdout.write(`${argv.toString()}\n`) // start parsing

    // Spread options, tasks and forwardOptions
    const optionRe = /^\-{1,2}[A-z]+$/
    const options = []
    const tasks = []
    let forwardOptions = []
    let group = 1

    argv.forEach((arg, i) => {
      if (group === 1 && arg.match(optionRe)) {
        options.push(arg)
        stdout.write(`adding ${arg} to options\n`)
      } else {
        group = group < 2 ? 2 : group
        if (group === 2 && !arg.match(optionRe)) {
          tasks.push(arg)
          stdout.write(`adding ${arg} to tasks\n`)
        } else {
          group = 3
          forwardOptions.push(arg)
          stdout.write(`adding ${arg} to forwardOptions\n`)
        }
      }
    })

    // parse options, merge with default options
    const config = { parallel: false }
    if (options.includes('-p') || options.includes('--parallel')) {
      config.parallel = true;
    }
    stdout.write(`parallel: ${config.parallel.toString()}\n`)
    stdout.write(`forwardOptions: ${forwardOptions.join(' ')}\n`)

    // now do the actual cross-spawning and passing down forwardOptions
}
