const Environment = require("jest-environment-jsdom-global");
const { TextEncoder, TextDecoder } = require("util");

class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();

    this.polyfillTextEncoder();
    this.polyfillTextDecoder();
  }

  polyfillTextEncoder() {
    if (typeof this.global.TextEncoder !== "undefined") {
      return;
    }

    this.global.TextEncoder = TextEncoder;
  }

  polyfillTextDecoder() {
    if (typeof this.global.TextDecoder !== "undefined") {
      return;
    }

    this.global.TextDecoder = TextDecoder;
  }
}

module.exports = CustomTestEnvironment;
