const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "g9az8i",
  reporter: 'cypress-mochawesome-reporter',
  //video: true,
  e2e: {
    baseUrl: 'https://www.almosafer.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    //screenshotOnRunFailure: true,

    viewportWidth: 1080,
    viewportHeight: 720,

    testIsolation: false,
  },
});
