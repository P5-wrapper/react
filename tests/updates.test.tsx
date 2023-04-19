import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "../src/main";

function sketchFromUpdateFunction(
  updateFunction: P5CanvasInstance["updateWithProps"]
) {
  const sketch: Sketch = vi.fn(p5 => {
    p5.updateWithProps = updateFunction;
  });

  return { sketch };
}

describe("Updates", () => {
  it("[updateWithProps] Is called when the component is mounted", () => {
    const updateFunction = vi.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);

    render(<ReactP5Wrapper sketch={sketch} x={100} />);
    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledWith({ x: 100 });
  });

  it("[updateWithProps] Is called when a prop value changes", () => {
    const updateFunction = vi.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} x={200} />);

    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({ x: 200 });
  });

  it("[updateWithProps] Is called when a prop is removed", () => {
    const updateFunction = vi.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} />);
    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({});
  });

  it("[updateWithProps] Is called when new props are added", () => {
    const updateFunction = vi.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} x={200} y={50} />);
    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({ x: 200, y: 50 });
  });

  it("[updateWithProps] Is called when props are traded", () => {
    const updateFunction = vi.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} y={100} />);
    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({ y: 100 });
  });
});
