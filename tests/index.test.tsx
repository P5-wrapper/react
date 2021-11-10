import React from "react";
import ReactDOMServer from "react-dom/server";
import p5 from "p5";
import { render } from "@testing-library/react";
import { P5Instance, ReactP5Wrapper } from "../src/index";
import { unwrapReadableStream } from "./helpers/streams";

describe("P5Wrapper", () => {
  describe("Rendering", () => {
    const sketch = (p5: p5) => {
      p5.setup = () => p5.createCanvas(720, 400);
    };

    it("Client side", () => {
      const { container } = render(<ReactP5Wrapper sketch={sketch} />);
      const canvas = container.querySelector("canvas");

      expect(canvas).not.toBeNull();
      expect(canvas).toBeInstanceOf(HTMLCanvasElement);
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
});
