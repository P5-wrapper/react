import { render } from "@testing-library/react";
import React from "react";

import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "../src";

function sketchFromUpdateFunction(
  updateFunction: P5CanvasInstance["updateWithProps"]
) {
  const sketch: Sketch = jest.fn(p5 => {
    p5.updateWithProps = updateFunction;
  });

  return { sketch };
}

describe("Updates", () => {
  it("[updateWithProps] Is called when the component is mounted", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);

    render(<ReactP5Wrapper sketch={sketch} x={100} />);
    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledWith({ x: 100 });
  });

  it("[updateWithProps] Is called when a prop value changes", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} x={200} />);

    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({ x: 200 });
  });

  it("[updateWithProps] Is called when a prop is removed", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} />);
    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({});
  });

  it("[updateWithProps] Is called when new props are added", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} x={200} y={50} />);
    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({ x: 200, y: 50 });
  });

  it("[updateWithProps] Is called when props are traded", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const { rerender } = render(<ReactP5Wrapper sketch={sketch} x={100} />);

    rerender(<ReactP5Wrapper sketch={sketch} y={100} />);
    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({ y: 100 });
  });

  it("[updateWithProps] is not called if object prop address changes but content is same when deepCompare is true", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const obj1 = { x: 100, y: 200 };
    const obj2 = { x: 100, y: 200 };
    const { rerender } = render(
      <ReactP5Wrapper sketch={sketch} data={obj1} deepCompare={true} />
    );

    rerender(<ReactP5Wrapper sketch={sketch} data={obj2} deepCompare={true} />);

    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(1);
  });

  it("[updateWithProps] is called if object prop address changes even if content is same when deepCompare is false", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const obj1 = { x: 100, y: 200 };
    const obj2 = { x: 100, y: 200 };
    const { rerender } = render(
      <ReactP5Wrapper sketch={sketch} data={obj1} deepCompare={false} />
    );

    rerender(
      <ReactP5Wrapper sketch={sketch} data={obj2} deepCompare={false} />
    );

    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({
      data: obj2,
      deepCompare: false
    });
  });

  it("[updateWithProps]is not called if object prop content changes and deepCompare is false", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const myObject = { x: 100, y: 200 };
    const { rerender } = render(
      <ReactP5Wrapper sketch={sketch} data={myObject} deepCompare={false} />
    );

    myObject.x = 150;
    rerender(
      <ReactP5Wrapper sketch={sketch} data={myObject} deepCompare={false} />
    );
    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(1);
  });

  it("[updateWithProps] is called if prop is added and deepCompare is false", () => {
    const updateFunction = jest.fn();
    const { sketch } = sketchFromUpdateFunction(updateFunction);
    const myObject = { x: 100, y: 200 };
    const { rerender } = render(
      <ReactP5Wrapper sketch={sketch} data={myObject} deepCompare={false} />
    );

    rerender(
      <ReactP5Wrapper
        sketch={sketch}
        data={myObject}
        new={100}
        deepCompare={false}
      />
    );
    expect(sketch).toHaveBeenCalledTimes(1);
    expect(updateFunction).toHaveBeenCalledTimes(2);
    expect(updateFunction).toHaveBeenCalledWith({
      data: myObject,
      new: 100,
      deepCompare: false
    });
  });
});
