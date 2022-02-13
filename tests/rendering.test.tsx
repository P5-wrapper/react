import React from "react";
import { render } from "@testing-library/react";
import ReactDOMServer from "react-dom/server";
import { unwrapReadableStream } from "./helpers/streams";
import { ReactP5Wrapper, Sketch } from "../src/index";

const sketch: Sketch = p5 => {
  p5.setup = () => p5.createCanvas(720, 400);
};

describe("Rendering", () => {
  describe("Client side", () => {
    it("Renders the canvas into the wrapping element", () => {
      const { container } = render(<ReactP5Wrapper sketch={sketch} />);
      const canvas = container.querySelector("canvas");

      expect(canvas).not.toBeNull();
      expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    });

    it("Unmounts the canvas when the element is removed from the DOM", () => {
      const { container, unmount } = render(<ReactP5Wrapper sketch={sketch} />);

      unmount();

      expect(container.innerHTML).toBe("");
    });
  });

  describe("Server side", () => {
    const SERVER_MARKUP = `<div></div>`;

    it("Server side string component", () => {
      const StringComponent = ReactDOMServer.renderToString(
        <ReactP5Wrapper sketch={sketch} />
      );

      expect(StringComponent).toBe(SERVER_MARKUP);
    });

    it("Server side static component", () => {
      const StaticComponent = ReactDOMServer.renderToStaticMarkup(
        <ReactP5Wrapper sketch={sketch} />
      );

      expect(StaticComponent).toBe(SERVER_MARKUP);
    });

    it("Server side node stream", async () => {
      const nodeStream = ReactDOMServer.renderToNodeStream(
        <ReactP5Wrapper sketch={sketch} />
      );
      const content = await unwrapReadableStream(nodeStream);
      expect(content).toBe(SERVER_MARKUP);
    });

    it("Server side static node stream", async () => {
      const staticNodeStream = ReactDOMServer.renderToStaticNodeStream(
        <ReactP5Wrapper sketch={sketch} />
      );
      const content = await unwrapReadableStream(staticNodeStream);
      expect(content).toBe(SERVER_MARKUP);
    });
  });
});
