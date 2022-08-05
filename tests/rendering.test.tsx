import { render } from "@testing-library/react";
import React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

import { ReactP5Wrapper, Sketch } from "../src/index";
import { unwrapReadableStream } from "./helpers/streams";

function setupTest() {
  const sketch: Sketch = p5 => {
    p5.setup = () => p5.createCanvas(720, 400);
  };

  return { sketch };
}

describe("Rendering", () => {
  it("[Client] Renders the canvas into the wrapping element", () => {
    const { sketch } = setupTest();
    const { container } = render(<ReactP5Wrapper sketch={sketch} />);
    const canvas = container.querySelector("canvas");

    expect(canvas).not.toBeNull();
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
  });

  it("[Client] Adds a utility css class to the wrapping element", () => {
    const { sketch } = setupTest();
    const { container } = render(<ReactP5Wrapper sketch={sketch} />);

    expect(container.firstElementChild!.className).toBe("react-p5-wrapper");
  });

  it("[Client] Recreates the P5 instance when the sketch is changed", () => {
    const { sketch } = setupTest();
    const { container, rerender } = render(<ReactP5Wrapper sketch={sketch} />);

    rerender(<ReactP5Wrapper sketch={sketch} />);

    const canvas = container.querySelector("canvas");

    expect(canvas).not.toBeNull();
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
  });

  it("[Client] Unmounts the canvas when the element is removed from the DOM", () => {
    const { sketch } = setupTest();
    const { container, unmount } = render(<ReactP5Wrapper sketch={sketch} />);

    unmount();

    expect(container.innerHTML).toBe("");
  });

  it("[Server] Renders as expected when using `renderToString`", () => {
    const { sketch } = setupTest();
    const StringComponent = renderToString(<ReactP5Wrapper sketch={sketch} />);

    expect(StringComponent).toBe('<div class="react-p5-wrapper"></div>');
  });

  it("[Server] Renders as expected when using `renderToStaticMarkup`", () => {
    const { sketch } = setupTest();
    const StaticComponent = renderToStaticMarkup(
      <ReactP5Wrapper sketch={sketch} />
    );

    expect(StaticComponent).toBe('<div class="react-p5-wrapper"></div>');
  });

  it("[General] Should not render anything when the `sketch` prop is not provided", () => {
    const { container } = render(<ReactP5Wrapper />);

    expect(container.innerHTML).toBe("");
  });

  it("[General] Should log an error to the console when the `sketch` prop is not provided", () => {
    const errorMock = jest.fn();
    const errorMockSpy = jest
      .spyOn(console, "error")
      .mockImplementation(errorMock);

    render(<ReactP5Wrapper />);

    expect(errorMockSpy).toHaveBeenCalledTimes(1);
    expect(errorMockSpy).toHaveBeenCalledWith(
      "[ReactP5Wrapper] The `sketch` prop is required."
    );

    errorMockSpy.mockReset();
    errorMockSpy.mockRestore();
  });
});
