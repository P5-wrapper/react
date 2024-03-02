import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { P5WrapperClassName, ReactP5Wrapper, Sketch } from "../src/main";

function setupTest() {
  const sketch: Sketch = p5 => {
    p5.setup = () => p5.createCanvas(720, 400);
  };

  return { sketch };
}

describe("Rendering", () => {
  it("[Client] Renders the canvas into the wrapping element", async () => {
    const { sketch } = setupTest();
    const { findByTestId } = render(<ReactP5Wrapper sketch={sketch} />);

    const wrapper = await findByTestId("wrapper");
    const canvas = wrapper.querySelector("canvas");

    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
  });

  it("[Client] Recreates the P5 instance when the sketch is changed", async () => {
    const { sketch } = setupTest();
    const { rerender, findByTestId } = render(
      <ReactP5Wrapper sketch={sketch} />
    );

    rerender(<ReactP5Wrapper sketch={sketch} />);

    const wrapper = await findByTestId("wrapper");
    const canvas = wrapper.querySelector("canvas");

    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
  });

  it("[Client] Adds a utility css class to the wrapping element", async () => {
    const { sketch } = setupTest();
    const { findByTestId } = render(<ReactP5Wrapper sketch={sketch} />);

    const wrapper = await findByTestId("wrapper");

    expect(wrapper).toBeInstanceOf(HTMLDivElement);
    expect(wrapper.className).toBe(P5WrapperClassName);
  });

  it("[Client] Unmounts the canvas when the element is removed from the DOM", async () => {
    const { sketch } = setupTest();
    const { container, unmount, findByTestId } = render(
      <ReactP5Wrapper sketch={sketch} />
    );

    await findByTestId("wrapper");

    expect(container.innerHTML).not.toBe("");

    unmount();

    expect(container.innerHTML).toBe("");
  });

  it("[Server] Renders as expected when using `renderToString`", () => {
    const { sketch } = setupTest();
    const StringComponent = renderToString(<ReactP5Wrapper sketch={sketch} />);

    expect(StringComponent).toBe(
      `<!--$--><div class="${P5WrapperClassName}" data-testid="wrapper"></div><!--/$-->`
    );
  });

  it("[Server] Renders as expected when using `renderToStaticMarkup`", () => {
    const { sketch } = setupTest();
    const StaticComponent = renderToStaticMarkup(
      <ReactP5Wrapper sketch={sketch} />
    );

    expect(StaticComponent).toBe(
      `<div class="${P5WrapperClassName}" data-testid="wrapper"></div>`
    );
  });

  it("[General] Should not render anything when the `sketch` prop is not provided", () => {
    const errorMock = vi.fn();
    vi.spyOn(console, "error").mockImplementation(errorMock);

    const { container } = render(<ReactP5Wrapper />);

    expect(container.innerHTML).toBe("");
  });

  it("[General] Should log an error to the console when the `sketch` prop is not provided", async () => {
    const errorMock = vi.fn();
    const errorMockSpy = vi
      .spyOn(console, "error")
      .mockImplementation(errorMock);

    render(<ReactP5Wrapper />);

    await waitFor(() => {
      expect(errorMockSpy).toHaveBeenCalledTimes(1);
      expect(errorMockSpy).toHaveBeenCalledWith(
        "[ReactP5Wrapper] The `sketch` prop is required."
      );

      errorMockSpy.mockReset();
      errorMockSpy.mockRestore();
    });
  });

  it("[General] Should use the fallback UI if the sketch is undefined on initial render", async () => {
    const { findByTestId } = render(
      <ReactP5Wrapper fallback={<h1 data-testid="title">Oh no</h1>} />
    );

    const title = await findByTestId("title");

    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe("Oh no");
  });

  it("[General] Should use the fallback UI if the sketch is undefined on future renders", async () => {
    const { sketch } = setupTest();
    const { rerender, findByTestId } = render(
      <ReactP5Wrapper fallback={<h1>Oh no</h1>} sketch={sketch} />
    );

    await findByTestId("wrapper");

    rerender(
      <ReactP5Wrapper
        fallback={<h1 data-testid="title">Oh no</h1>}
        sketch={undefined}
      />
    );

    const title = await findByTestId("title");

    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe("Oh no");
  });
});
