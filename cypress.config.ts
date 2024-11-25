import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
  viewportWidth: 1920, 
  viewportHeight: 1080,
});