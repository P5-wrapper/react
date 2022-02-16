import React from "react";
import { render } from "@testing-library/react";
import { P5Instance, ReactP5Wrapper } from "../src";

describe("Updates", () => {
  it("Calls `updateWithProps` when the props change", () => {
    const updateFunction = jest.fn(() => {});
    const sketch = (p5: P5Instance) => {
      p5.updateWithProps = updateFunction;
    };
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);
    expect(updateFunction).toBeCalledTimes(1);

    rerender(<ReactP5Wrapper sketch={sketch} x={200} />);
    expect(updateFunction).toBeCalledTimes(2);
  });
});
