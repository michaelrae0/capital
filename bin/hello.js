const chalk = require('chalk')
const pkg = require('../package.json')

console.log(`

${chalk.green('NYCA Gatsby driven website🎉')}

To get you going really quickly this project includes a setup step.

${chalk.yellow.bold('yarn run setup')} automates the following steps for you:
  - creates a config file ${chalk.yellow('./.contentful.json')}
  - imports ${chalk.green('a predefined content model')}

When this is done run:

${chalk.yellow(
  'yarn run develop'
)} to start a development environment at ${chalk.green('0.0.0.0:8990')}

or

${chalk.yellow(
  'yarn run build'
)} to create a production ready static site in ${chalk.green('./public')}

`)
