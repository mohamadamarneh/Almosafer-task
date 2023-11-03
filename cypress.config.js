const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "g9az8i",
  viewportWidth: 1080,
  viewportHeight: 720,
  
 




  e2e: {
    baseUrl: 'https://www.almosafer.com/',


    setupNodeEvents(on, config) {
      // implement node event listeners here
      screenshotOnRunFailure: true;
    },
    testIsolation: false,
  },
});
