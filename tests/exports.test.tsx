import { createElement, isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";

import { P5WrapperClassName, ReactP5Wrapper } from "../src/main";

describe("Exports", () => {
  it("should export the css class name used on the wrapper", () => {
    expect(P5WrapperClassName).not.toBeUndefined();
  });

  it("should export the css class name used on the wrapper as a non-empty string", () => {
    expect(typeof P5WrapperClassName).toBe("string");
    expect(P5WrapperClassName.length).toBeGreaterThan(0);
  });

  it("should export the wrapper component", () => {
    expect(ReactP5Wrapper).not.toBeUndefined();
  });

  it("should export the wrapper component as a react element", () => {
    const component = createElement(ReactP5Wrapper, {
      sketch: vi.fn()
    });

    expect(ReactP5Wrapper).toBeInstanceOf(Object);
    expect(isValidElement(component)).toBe(true);
  });
});
