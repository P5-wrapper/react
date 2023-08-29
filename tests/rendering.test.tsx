import * as React from "react";
import { render } from "@testing-library/react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { assert, describe, expect, it, vi } from "vitest";

import { ReactP5Wrapper, Sketch } from "../src/main";

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

    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
  });

  it("[Client] Adds a utility css class to the wrapping element", () => {
    const { sketch } = setupTest();
    const { container } = render(<ReactP5Wrapper sketch={sketch} />);

    assert(container.firstElementChild instanceof HTMLDivElement);

    expect(container.firstElementChild.className).toBe("react-p5-wrapper");
  });

  it("[Client] Recreates the P5 instance when the sketch is changed", () => {
    const { sketch } = setupTest();
    const { container, rerender } = render(<ReactP5Wrapper sketch={sketch} />);

    rerender(<ReactP5Wrapper sketch={sketch} />);

    const canvas = container.querySelector("canvas");

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
    const errorMock = vi.fn();
    vi.spyOn(console, "error").mockImplementation(errorMock);

    const { container } = render(<ReactP5Wrapper />);

    expect(container.innerHTML).toBe("");
  });

  it("[General] Should log an error to the console when the `sketch` prop is not provided", () => {
    const errorMock = vi.fn();
    const errorMockSpy = vi
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

  it("[General] Should use the fallback UI if the sketch is undefined on initial render", () => {
    const { container } = render(<ReactP5Wrapper fallback={<h1>Oh no</h1>} />);

    assert(container.firstElementChild instanceof HTMLHeadingElement);

    expect(container.firstElementChild.textContent).toBe("Oh no");
  });

  it("[General] Should use the fallback UI if the sketch is undefined on future renders", () => {
    const { sketch } = setupTest();
    const { container, rerender } = render(
      <ReactP5Wrapper fallback={<h1>Oh no</h1>} sketch={sketch} />
    );

    assert(container.firstElementChild instanceof HTMLDivElement);

    expect(container.firstElementChild.className).toBe("react-p5-wrapper");

    rerender(<ReactP5Wrapper fallback={<h1>Oh no</h1>} sketch={undefined} />);

    assert(container.firstElementChild instanceof HTMLHeadingElement);

    expect(container.firstElementChild.textContent).toBe("Oh no");
  });
});
