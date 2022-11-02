import Environment from "jest-environment-jsdom-global";
import { TextDecoder, TextEncoder } from "util";

export default class CustomTestEnvironment extends Environment {
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
