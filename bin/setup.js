const spaceImport = require('contentful-import')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const { writeFileSync } = require('fs')

const argv = require('yargs-parser')(process.argv.slice(2))

console.log(`
  In order to setup the prorject, you will need to provide your Contentful Space ID
  and the corresponding API access tokens.

  You can find all the needed information in your Contentful space under:
   ${chalk.yellow(
     `app.contentful.com ${chalk.red('->')} Space Settings ${chalk.red('->')} API Keys`
   )}

   The ${chalk.green('Content Management API Token')} will be used to import and write data to your space.

  The ${chalk.green('Content Delivery API Token')} will be used to ship published production-ready content in your Gatsby app.

  The ${chalk.green('Content Preview API Token')} will be used to show not published data in your development environment.

  Let's begin.
`)

const questions = [
  {
    name: 'spaceId',
    message: 'Your Space ID',
    when: !argv.spaceId && !process.env.CONTENTFUL_SPACE_ID,
    validate: input =>
    /^[a-z0-9]{12}$/.test(input) ||
    'Space ID must be 12 lowercase characters',
  },
  {
    name: 'managementToken',
    when: !argv.managementToken,
    message: 'Your Content Management API access token',
  },
  {
    name: 'deliveryToken',
    when: !argv.deliveryToken && !process.env.CONTENTFUL_DELIVERY_TOKEN,
    message: 'Your Content Delivery API access token',
  },
]

// run inquirer
inquirer
  .prompt(questions)
  .then(({ spaceId, managementToken, deliveryToken }) => {
    const { CONTENTFUL_SPACE_ID, CONTENTFUL_DELIVERY_TOKEN } = process.env;

    spaceId = CONTENTFUL_SPACE_ID || argv.spaceId || spaceId;
    managementToken = argv.managementToken || managementToken;
    deliveryToken = CONTENTFUL_DELIVERY_TOKEN || argv.deliveryToken || deliveryToken;

    console.log('Writing config file...')
    const configFilePath = path.resolve(__dirname, '..', '.contentful.json');
    writeFileSync(
      configFilePath,
      JSON.stringify(
        {
          spaceId,
          accessToken: deliveryToken,
        },
        null,
        2
      )
    )
    console.log(`Config file ${chalk.yellow(configFilePath)} has been written successfully.`)

    return { spaceId, managementToken }
  })
  .then((_, error) => {
    console.log(
      `You're all set! You can now run ${chalk.yellow(
        'yarn run develop'
      )} to see the development server.`
    )
  })
  .catch(error => console.error(error));