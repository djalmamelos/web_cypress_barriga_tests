const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    pageLoadTimeout: 100000,
    defaultCommandTimeout: 6000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://barrigarest.wcaquino.me'
  },
});
