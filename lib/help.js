module.exports = function help() {
  process.stdout.write(`
  Usage:
    $ yall [options] [tasks] [forward-options]

  Run several npm scripts in parallel or in sequence forwarding options in a yarn-friendly manner

  [tasks] - npm script names and matching patterns

  Options:
    -s, --serial, --sequential, --sequence    run tasks in sequence
    -p, --parallel                            run tasks in parallel
    -v, --version                             print version
    -h, --help                                print help

  Examples:

    Run tasks in sequence (default):
      $ yall clean lint test build
      $ yall -s clean lint test build
      $ yall --serial clean lint test build
      $ yall --sequential clean lint test build

    Run tasks in parallel:
      $ yall -p clean lint test build
      $ yall --parallel clean lint test build

    Run tasks using matching patterns:
      $ yall lint:*                           run lint:js, lint:css, lint:js:bin, lint:js:lib
      $ yall lint:*:*                         run lint:js:bin, lin:js:lib

    Forward options to each task:
      $ yall -p start:mockBackend start:devServer --watch
      $ yall -p start:* --watch
      $ yall --parallel lint:* --fix

    Run the yall based npm script forwarding the option in a yarn-friendly manner:

      {
        "scripts": {
          "lint:js": "eslint ./src",
          "lint:css": "stylelint ./src",
          "lint": "yall --parallel lint:*"
        }
      }

      $ yarn lint --fix

  GitHub:
    https://github.com/dubbha/yall-scripts#readme
`);

  process.exit();
}
