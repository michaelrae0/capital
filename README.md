Archon
------
This project is the Gatsby static site generator for a Contentful organization space.

## Setup
In order to install this project, you will need to have Yarn and Node on your system. 

You will also need to have the Contentful `spaceId`, `managementToken` and `deliveryToken` available.

### Install dependencies
First install all of the required npm packages:

```shell
yarn install
```

After installing, you should be prompted to run the Contentful setup:

```shell
yarn setup
```

## Running the Application (after initial setup)

Gatsby can serve the website and watch for changes. To serve the site simply run:

```shell
yarn start
```

This will build the application, spin up a dev server and watch the filesystem for any changes. If 
changes are detectd, the site will refresh in the browser.