import { createElement, isValidElement } from "react";
import { assert, describe, expect, it, vi } from "vitest";

import { P5WrapperClassName, ReactP5Wrapper } from "../src/main";

describe("Exports", () => {
  describe("P5WrapperClassName", () => {
    it("Exports the css class name used on the wrapper", () => {
      expect(P5WrapperClassName).not.toBeUndefined();
      expect(P5WrapperClassName).toBe("p5-wrapper-react");
    });

    it("Exports the css class name used on the wrapper as a non-empty string", () => {
      expect(typeof P5WrapperClassName).toBe("string");
      expect(P5WrapperClassName.length).toBeGreaterThan(0);
    });

    it("Exports the wrapper component", () => {
      expect(ReactP5Wrapper).not.toBeUndefined();
    });
  });

  describe("ReactP5Wrapper", () => {
    it("Exports the wrapper component as a react element", () => {
      const component = createElement(ReactP5Wrapper, {
        sketch: vi.fn()
      });

      assert(isValidElement(component));
    });
  });
});
