import { render, RenderResult, waitFor } from "@testing-library/react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { assert, describe, expect, it, vi } from "vitest";

import { ReactP5Wrapper } from "../../src/components/ReactP5Wrapper";
import { P5WrapperClassName } from "../../src/constants/P5WrapperClassName";
import { type P5CanvasInstance } from "../../src/contracts/P5CanvasInstance";
import { type Sketch } from "../../src/contracts/Sketch";

function createSketch(
  updateFunction?: P5CanvasInstance["updateWithProps"]
): Sketch {
  return vi.fn(p5 => {
    p5.setup = () => p5.createCanvas(720, 400);
    p5.updateWithProps = updateFunction;
  });
}

async function waitForCanvas(findByTestId: RenderResult["findByTestId"]) {
  return await waitFor(async () => {
    const wrapper = await findByTestId("wrapper");
    const canvas = wrapper.querySelector("canvas");

    assert(canvas instanceof HTMLCanvasElement);

    return canvas;
  });
}

async function waitForLoading(findByTestId: RenderResult["findByTestId"]) {
  return await waitFor(async () => {
    const loading = await findByTestId("loading");

    assert(loading instanceof HTMLParagraphElement);

    return loading;
  });
}

describe("ReactP5Wrapper", () => {
  describe("Rendering", () => {
    describe("Client", () => {
      it("Renders the canvas into the wrapping element", async () => {
        const sketch = createSketch();
        const { findByTestId } = render(<ReactP5Wrapper sketch={sketch} />);
        const canvas = await waitForCanvas(findByTestId);

        expect(canvas).toBeInstanceOf(HTMLCanvasElement);
      });

      it("Recreates the P5 instance when the sketch is changed", async () => {
        const sketch = createSketch();
        const { rerender, findByTestId } = render(
          <ReactP5Wrapper sketch={sketch} />
        );

        rerender(<ReactP5Wrapper sketch={sketch} />);
        const canvas = await waitForCanvas(findByTestId);

        expect(canvas).toBeInstanceOf(HTMLCanvasElement);
      });

      it("Adds a utility css class to the wrapping element", async () => {
        const sketch = createSketch();
        const { findByTestId } = render(<ReactP5Wrapper sketch={sketch} />);

        const wrapper = await findByTestId("wrapper");

        expect(wrapper).toBeInstanceOf(HTMLDivElement);
        expect(wrapper.className).toBe(P5WrapperClassName);
      });

      it("Unmounts the canvas when the element is removed from the DOM", async () => {
        const sketch = createSketch();
        const { container, unmount, findByTestId } = render(
          <ReactP5Wrapper sketch={sketch} />
        );

        await waitForCanvas(findByTestId);

        expect(container.innerHTML).not.toBe("");

        unmount();

        expect(container.innerHTML).toBe("");
      });

      it("Should not render anything when the `sketch` and `fallback` props are not provided", () => {
        const { container } = render(<ReactP5Wrapper />);

        expect(container.innerHTML).toBe("");
      });

      it("Should log an error to the console when the `sketch` prop is not provided", async () => {
        const errorLogger = vi.fn();
        const errorLoggerSpy = vi
          .spyOn(console, "error")
          .mockImplementation(errorLogger);

        render(<ReactP5Wrapper />);

        await waitFor(() => {
          expect(errorLoggerSpy).toHaveBeenCalledOnce();
          expect(errorLoggerSpy).toHaveBeenCalledWith(
            "[ReactP5Wrapper] The `sketch` prop is required."
          );

          errorLoggerSpy.mockReset();
          errorLoggerSpy.mockRestore();
        });
      });

      it("Should use the fallback UI if the sketch is undefined on initial render", async () => {
        const fallbackView = vi.fn(() => <div data-testid="fallback" />);
        const { findByTestId } = render(
          <ReactP5Wrapper fallback={fallbackView} />
        );

        const fallback = await findByTestId("fallback");

        expect(fallbackView).toHaveBeenCalledOnce();
        expect(fallback).toBeInTheDocument();
      });

      it("Should use the fallback UI if the sketch is undefined on future renders", async () => {
        const sketch = createSketch();
        const fallbackView = vi.fn(() => <div data-testid="fallback" />);
        const { rerender, findByTestId } = render(
          <ReactP5Wrapper fallback={() => <h1>Oh no</h1>} sketch={sketch} />
        );

        await waitForCanvas(findByTestId);

        rerender(<ReactP5Wrapper fallback={fallbackView} sketch={undefined} />);

        const fallback = await findByTestId("fallback");

        expect(fallbackView).toHaveBeenCalledOnce();
        expect(fallback).toBeInTheDocument();
      });

      it.skip("Should show the loading UI when the `loading` prop is not set and the sketch is not yet loaded", async () => {
        const sketch = createSketch();
        const { findByTestId } = render(<ReactP5Wrapper sketch={sketch} />);
        const loading = await waitForLoading(findByTestId);

        expect(loading).toBeInstanceOf(HTMLParagraphElement);
        expect(loading.innerHTML).toBe("🚀 Loading...");
      });

      it.skip("Should show the loading UI while the canvas has not yet rendered into the page", async () => {
        const sketch = createSketch();
        const LoadingView = vi.fn(() => (
          <p data-testid="loading">Loading test...</p>
        ));
        const { findByTestId } = render(
          <ReactP5Wrapper loading={LoadingView} sketch={sketch} />
        );
        const loading = await waitForLoading(findByTestId);

        expect(LoadingView).toHaveBeenCalledOnce();
        expect(loading).toBeInstanceOf(HTMLParagraphElement);
        expect(loading.innerHTML).toBe("Loading test...");
      });

      it("Should show the default error UI when the `error` prop is not set an error is thrown within the subtree of the wrapper", async () => {
        const sketch = createSketch();
        const ErrorChild = () => {
          throw new Error("oops");
        };

        const { findByTestId } = render(
          <ReactP5Wrapper sketch={sketch}>
            <ErrorChild />
          </ReactP5Wrapper>
        );

        const error = await findByTestId("error");

        expect(error).toBeInstanceOf(HTMLParagraphElement);
        expect(error.textContent).toBe("❌ - Something went wrong");
      });

      it("Should show the error UI when the `error` prop is set an error is thrown within the subtree of the wrapper", async () => {
        const sketch = createSketch();
        const ErrorView = vi.fn(error => {
          assert(error instanceof Error);

          return <div data-testid="error">Error: {error.message}</div>;
        });
        const ErrorChild = () => {
          throw new Error("oops");
        };

        const { findByTestId } = render(
          <ReactP5Wrapper error={ErrorView} sketch={sketch}>
            <ErrorChild />
          </ReactP5Wrapper>
        );

        const error = await findByTestId("error");

        expect(ErrorView).toHaveBeenCalledTimes(2); // Seems there is a double-render issue with the error-boundary, not sure why since we are not in strict-mode during testing and so I assume it is a library issue instead.
        expect(error).toBeInstanceOf(HTMLDivElement);
        expect(error.innerHTML).toBe("Error: oops");
      });

      it("Should log the error when an error is thrown within the subtree of the wrapper", async () => {
        const sketch = createSketch();
        const ErrorView = vi.fn(() => <div data-testid="error" />);
        const errorLogger = vi.fn();
        const errorLoggerSpy = vi
          .spyOn(console, "error")
          .mockImplementation(errorLogger);
        const ErrorChild = () => {
          throw new Error("oops");
        };

        const { findByTestId } = render(
          <ReactP5Wrapper error={ErrorView} sketch={sketch}>
            <ErrorChild />
          </ReactP5Wrapper>
        );

        await findByTestId("error");

        expect(errorLoggerSpy).toHaveBeenCalledTimes(2);
        expect(errorLoggerSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            "[ReactP5Wrapper] The error boundary was triggered. The error message was:"
          )
        );
        expect(errorLoggerSpy).toHaveBeenCalledWith(
          expect.stringContaining("oops")
        );

        errorLoggerSpy.mockReset();
        errorLoggerSpy.mockRestore();
      });
    });

    describe("Server", () => {
      it("Renders as expected when using `renderToString`", () => {
        const sketch = createSketch();
        const StringComponent = renderToString(
          <ReactP5Wrapper sketch={sketch} />
        );

        expect(StringComponent).toBe(
          `<!--$--><div class="${P5WrapperClassName}" data-testid="wrapper"></div><!--/$-->`
        );
      });

      it("Renders as expected when using `renderToStaticMarkup`", () => {
        const sketch = createSketch();
        const StaticComponent = renderToStaticMarkup(
          <ReactP5Wrapper sketch={sketch} />
        );

        expect(StaticComponent).toBe(
          `<div class="${P5WrapperClassName}" data-testid="wrapper"></div>`
        );
      });
    });
  });

  describe("Updates", () => {
    it("Calls `updateWithProps` when the component is mounted", async () => {
      const updateFunction = vi.fn();
      const sketch = createSketch(updateFunction);

      const { findByTestId } = render(
        <ReactP5Wrapper sketch={sketch} x={100} />
      );

      await waitForCanvas(findByTestId);

      expect(sketch).toHaveBeenCalledOnce();
      expect(updateFunction).toHaveBeenCalledOnce();
      expect(updateFunction).toHaveBeenCalledWith({ x: 100 });
    });

    it("Calls `updateWithProps` when a prop value changes", async () => {
      const updateFunction = vi.fn();
      const sketch = createSketch(updateFunction);
      const { rerender, findByTestId } = render(
        <ReactP5Wrapper sketch={sketch} x={100} />
      );

      await waitForCanvas(findByTestId);

      rerender(<ReactP5Wrapper sketch={sketch} x={200} />);

      expect(sketch).toHaveBeenCalledOnce();
      expect(updateFunction).toHaveBeenCalledTimes(2);
      expect(updateFunction).toHaveBeenCalledWith({ x: 200 });
    });

    it("Calls `updateWithProps` when a prop is removed", async () => {
      const updateFunction = vi.fn();
      const sketch = createSketch(updateFunction);
      const { rerender, findByTestId } = render(
        <ReactP5Wrapper sketch={sketch} x={100} />
      );

      await waitForCanvas(findByTestId);

      rerender(<ReactP5Wrapper sketch={sketch} />);

      expect(sketch).toHaveBeenCalledOnce();
      expect(updateFunction).toHaveBeenCalledTimes(2);
      expect(updateFunction).toHaveBeenCalledWith({});
    });

    it("Calls `updateWithProps` when new props are added", async () => {
      const updateFunction = vi.fn();
      const sketch = createSketch(updateFunction);
      const { rerender, findByTestId } = render(
        <ReactP5Wrapper sketch={sketch} x={100} />
      );

      await waitForCanvas(findByTestId);

      rerender(<ReactP5Wrapper sketch={sketch} x={200} y={50} />);

      expect(sketch).toHaveBeenCalledOnce();
      expect(updateFunction).toHaveBeenCalledTimes(2);
      expect(updateFunction).toHaveBeenCalledWith({ x: 200, y: 50 });
    });

    it("Calls `updateWithProps` when props are traded", async () => {
      const updateFunction = vi.fn();
      const sketch = createSketch(updateFunction);
      const { rerender, findByTestId } = render(
        <ReactP5Wrapper sketch={sketch} x={100} />
      );

      await waitForCanvas(findByTestId);

      rerender(<ReactP5Wrapper sketch={sketch} y={100} />);

      expect(sketch).toHaveBeenCalledOnce();
      expect(updateFunction).toHaveBeenCalledTimes(2);
      expect(updateFunction).toHaveBeenCalledWith({ y: 100 });
    });
  });
});
