import React, { createFactory } from "react";

import { ReactP5Wrapper, wrapperClassName } from "../src";

describe("Exports", () => {
  it("should export the css class name used on the wrapper", () => {
    expect(wrapperClassName).not.toBeUndefined();
  });

  it("should export the css class name used on the wrapper as a non-empty string", () => {
    expect(typeof wrapperClassName).toBe("string");
    expect(wrapperClassName.length).toBeGreaterThan(0);
  });

  it("should export the wrapper component", () => {
    expect(ReactP5Wrapper).not.toBeUndefined();
  });

  it("should export the wrapper component as a react element", () => {
    const componentFactory = createFactory(ReactP5Wrapper);
    const component = componentFactory({
      sketch: jest.fn()
    });

    expect(ReactP5Wrapper).toBeInstanceOf(Object);
    expect(React.isValidElement(component)).toBe(true);
  });
});
