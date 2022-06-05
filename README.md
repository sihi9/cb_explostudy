# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Installation

This app is based on npm. To get all necessary packages, install npm on your system and run
```bash
npm install
```
from the root directory of the project.

To correctly use the app, meilisearch has to be installed and running on the same system on the port specified in src/config.js. 
More information on meilisearch [here](https://docs.meilisearch.com/). 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the frontend part of the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run server`

Runs the express server of the app on the port specified in src/config.js, serving the app found in the build folder.
If no config file is defined, make sure to create one with the following structure:

    module.exports = global.config = {
        port:1337,
        meiliSearchPort: 7700,
        apiKey: 1234
    };


