import { CanvasContainerClassName, P5Canvas } from "@/main";
import { createElement, isValidElement } from "react";
import { assert, describe, expect, it, vi } from "vitest";

describe("Exports", () => {
  describe("CanvasContainerClassName", () => {
    it("Exports the css class name used on the wrapper", () => {
      expect(CanvasContainerClassName).not.toBeUndefined();
      expect(CanvasContainerClassName).toBe("canvas-container");
    });

    it("Exports the css class name used on the wrapper as a non-empty string", () => {
      expect(typeof CanvasContainerClassName).toBe("string");
      expect(CanvasContainerClassName.length).toBeGreaterThan(0);
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
