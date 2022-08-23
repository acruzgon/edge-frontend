const { defineConfig } = require("cypress");

// eslint-disable-next-line no-unused-vars
const fs = require("fs-extra");
const path = require("path");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("cypress/config", `${file}.env.json`);
  // check if file exists
  if (!fs.existsSync(pathToConfigFile)) {
    throw new Error(`Config file ${pathToConfigFile} does not exist`);
  }

  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  chromeWebSecurity: false,

  e2e: {
    setupNodeEvents(on, config) {
      // accept a configFile value or use local by default
      //const file = config.env.configFile || "local";
      config.env =  {
        "username": "insights-qa",
        "password": "redhatqa",
        "codeCoverageTasksRegistered": true
    },
    config.baseUrl= "https://stage.foo.redhat.com:1337/beta/edge"
      require('@bahmutov/cypress-code-coverage/plugin')(on, config)
      //return getConfigurationByFile(file);
      return config
    },
    // devServer: {
    //   framework: 'create-react-app',
    //   bundler: 'webpack',
    //   webpackConfig: {
    //     mode: 'development',
    //     devtool: false,
    //     module: {
    //       rules: [
    //         // application and Cypress files are bundled like React components
    //         // and instrumented using the babel-plugin-istanbul
    //         // (we will filter the code coverage for non-application files later)
    //         {
    //           test: /\.js$/,
    //           exclude: /node_modules/,
    //           use: {
    //             loader: 'babel-loader',
    //             options: {
    //               presets: ['@babel/preset-env', '@babel/preset-react'],
    //               plugins: [
    //                 // we could optionally insert this plugin
    //                 // only if the code coverage flag is on
    //                 'istanbul',
    //               ],
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   },
    // },
  },

  // component: {
  //   devServer: {
  //     framework: "react",
  //     bundler: "webpack",
  //   },
  // },

});
