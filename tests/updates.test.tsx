import { render } from "@testing-library/react";
import React from "react";

import { P5Instance, ReactP5Wrapper, Sketch } from "../src";

function sketchFromUpdateFunction(
  updateFunction: P5Instance["updateWithProps"]
) {
  const sketch: Sketch = p5 => {
    p5.updateWithProps = updateFunction;
  };

  return { sketch };
}

describe("Updates", () => {
  it("Calls `updateWithProps` when the component is mounted", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);

    render(<ReactP5Wrapper sketch={sketch} x={100} />);
    expect(updateFunction).toBeCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledWith({ x: 100 });
  });

  it("Calls `updateWithProps` when a prop value changes", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} x={200} />);
    expect(updateFunction).toBeCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({ x: 200 });
  });

  it("Calls `updateWithProps` when a prop is removed", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} />);
    expect(updateFunction).toBeCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({});
  });

  it("Calls `updateWithProps` when new props are added", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} x={200} y={50} />);
    expect(updateFunction).toBeCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({ x: 200, y: 50 });
  });

  it("Calls `updateWithProps` when props are traded", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} y={100} />);
    expect(updateFunction).toBeCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({ y: 100 });
  });
});
