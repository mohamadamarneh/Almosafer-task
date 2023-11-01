const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1080,
  viewportHeight: 720,



  e2e: {
    baseUrl: 'https://www.almosafer.com/',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
