module.exports = function help() {
  process.stdout.write(`
  Usage:
    $ yarn-all [options] [tasks] [forward-options]

  Run several npm scripts in parallel or in sequence forwarding options in a yarn-friendly manner

  Options:
    -s, --serial, --sequential, --sequence    run tasks in sequence (default)
    -p, --parallel                            run tasks in parallel
    -v, --version                             output version
    -h, --help                                output help

  Examples:

    Run tasks in sequence:
      $ yarn-all clean lint test build
      $ yarn-all -s clean lint test build
      $ yarn-all --serial clean lint test build
      $ yarn-all --sequential clean lint test build

    Run tasks in parallel:
      $ yarn-all -p start:mockBackend start:devServer
      $ yarn-all -p start:mockBackend start:devServer
      $ yarn-all -p start:*
      $ yarn-all --parallel lint:*

    Forward options to each task:
      $ yarn-all -p start:mockBackend start:devServer --watch
      $ yarn-all -p start:* --watch
      $ yarn-all --parallel lint:* --fix

    Run the yarn-all based npm script forwarding the option in a yarn-friendly manner:

      {
        "scripts": {
          "lint:js": "eslint ./src",
          "lint:css": "stylelint ./src",
          "lint": "yarn-all --parallel lint:*"
        }
      }

      $ yarn lint --fix

  GitHub:
    https://github.com/dubbha/yarn-all#readme
`);

  process.exit();
}
