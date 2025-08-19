import { SketchProps } from "@/main";
import p5 from "@contracts/p5";
import { type P5CanvasInstanceRef } from "@contracts/P5CanvasInstanceRef";
import { removeCanvasInstance } from "@utils/removeCanvasInstance";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

describe("removeCanvasInstance", () => {
  it("Calls the remove method on the canvas if it exists", () => {
    const instance = new p5(() => {
      return;
    });
    const removeSpy = vi.spyOn(instance, "remove");
    const p5CanvasInstanceRef: P5CanvasInstanceRef<SketchProps> = createRef();
    p5CanvasInstanceRef.current = instance;

    removeCanvasInstance(p5CanvasInstanceRef);

    expect(removeSpy).toHaveBeenCalledOnce();
  });

  it("Sets the provided canvas instance ref to null", () => {
    const instance = new p5(() => {
      return;
    });
    const p5CanvasInstanceRef: P5CanvasInstanceRef<SketchProps> = createRef();
    p5CanvasInstanceRef.current = instance;

    expect(p5CanvasInstanceRef.current).not.toBeNull();

    removeCanvasInstance(p5CanvasInstanceRef);

    expect(p5CanvasInstanceRef.current).toBeNull();
  });
});
