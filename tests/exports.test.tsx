import { P5Canvas, P5WrapperClassName } from "@/main";
import { createElement, isValidElement } from "react";
import { assert, describe, expect, it, vi } from "vitest";

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
      expect(P5Canvas).not.toBeUndefined();
    });
  });

  describe("P5Canvas", () => {
    it("Exports the wrapper component as a react element", () => {
      const component = createElement(P5Canvas, {
        sketch: vi.fn()
      });

      assert(isValidElement(component));
    });
  });
});
