import React from "react";
import { render } from "@testing-library/react";
import {
  renderToNodeStream,
  renderToStaticMarkup,
  renderToStaticNodeStream,
  renderToString
} from "react-dom/server";
import { unwrapReadableStream } from "./helpers/streams";
import { ReactP5Wrapper, Sketch } from "../src/index";

const sketch: Sketch = p5 => {
  p5.setup = () => p5.createCanvas(720, 400);
};

describe("Rendering", () => {
  it("[Client] Renders the canvas into the wrapping element", () => {
    const { container } = render(<ReactP5Wrapper sketch={sketch} />);
    const canvas = container.querySelector("canvas");

    expect(canvas).not.toBeNull();
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
  });

  it("[Client] Adds a utility css class to the wrapping element", () => {
    const { container } = render(<ReactP5Wrapper sketch={sketch} />);

    expect(container.firstElementChild!.className).toBe("react-p5-wrapper");
  });

  it("[Client] Recreates the P5 instance when the sketch is changed", () => {
    const { container, rerender } = render(<ReactP5Wrapper sketch={sketch} />);

    rerender(<ReactP5Wrapper sketch={sketch} />);

    const canvas = container.querySelector("canvas");

    expect(canvas).not.toBeNull();
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
  });

  it("[Client] Unmounts the canvas when the element is removed from the DOM", () => {
    const { container, unmount } = render(<ReactP5Wrapper sketch={sketch} />);

    unmount();

    expect(container.innerHTML).toBe("");
  });

  it("[Server] Renders as expected when using `renderToString`", () => {
    const StringComponent = renderToString(<ReactP5Wrapper sketch={sketch} />);

    expect(StringComponent).toBe('<div class="react-p5-wrapper"></div>');
  });

  it("[Server] Renders as expected when using `renderToStaticMarkup`", () => {
    const StaticComponent = renderToStaticMarkup(
      <ReactP5Wrapper sketch={sketch} />
    );

    expect(StaticComponent).toBe('<div class="react-p5-wrapper"></div>');
  });

  it("[Server] Renders as expected when using `renderToNodeStream`", async () => {
    const nodeStream = renderToNodeStream(<ReactP5Wrapper sketch={sketch} />);
    const content = await unwrapReadableStream(nodeStream);

    expect(content).toBe('<div class="react-p5-wrapper"></div>');
  });

  it("[Server] Renders as expected when using `renderToStaticNodeStream`", async () => {
    const staticNodeStream = renderToStaticNodeStream(
      <ReactP5Wrapper sketch={sketch} />
    );
    const content = await unwrapReadableStream(staticNodeStream);

    expect(content).toBe('<div class="react-p5-wrapper"></div>');
  });
});
