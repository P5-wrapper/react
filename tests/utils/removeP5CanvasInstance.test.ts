import { SketchProps } from "@/main";
import { p5 } from "@contracts/p5";
import { type P5CanvasInstanceRef } from "@contracts/P5CanvasInstanceRef";
import { removeP5CanvasInstance } from "@utils/removeP5CanvasInstance";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

describe("removeP5CanvasInstance", () => {
  it("Calls the remove method on the P5 canvas instance if it exists", () => {
    const instance = new p5(() => {
      return;
    });
    const removeSpy = vi.spyOn(instance, "remove");
    const p5CanvasInstanceRef: P5CanvasInstanceRef<SketchProps> = createRef();

    // @see https://github.com/processing/p5.js/pull/7863
    // @ts-expect-error The p5 library changes from the above PR caused some issues with the inferred types.
    p5CanvasInstanceRef.current = instance;

    removeP5CanvasInstance(p5CanvasInstanceRef);

    expect(removeSpy).toHaveBeenCalledOnce();
  });

  it("Sets the provided P5 canvas instance ref to null", () => {
    const instance = new p5(() => {
      return;
    });
    const p5CanvasInstanceRef: P5CanvasInstanceRef<SketchProps> = createRef();

    // @see https://github.com/processing/p5.js/pull/7863
    // @ts-expect-error The p5 library changes from the above PR caused some issues with the inferred types.
    p5CanvasInstanceRef.current = instance;

    expect(p5CanvasInstanceRef.current).not.toBeNull();

    removeP5CanvasInstance(p5CanvasInstanceRef);

    expect(p5CanvasInstanceRef.current).toBeNull();
  });
});
