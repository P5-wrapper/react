import { SketchProps } from "@/main";
import { type CanvasInstanceRef } from "@contracts/CanvasInstanceRef";
import p5 from "@contracts/p5";
import { removeCanvasInstance } from "@utils/removeCanvasInstance";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

describe("removeCanvasInstance", () => {
  it("Calls the remove method on the canvas if it exists", () => {
    const instance = new p5(() => {
      return;
    });
    const removeSpy = vi.spyOn(instance, "remove");
    const canvasInstanceRef: CanvasInstanceRef<SketchProps> = createRef();
    canvasInstanceRef.current = instance;

    removeCanvasInstance(canvasInstanceRef);

    expect(removeSpy).toHaveBeenCalledOnce();
  });

  it("Sets the provided canvas instance ref to null", () => {
    const instance = new p5(() => {
      return;
    });
    const canvasInstanceRef: CanvasInstanceRef<SketchProps> = createRef();
    canvasInstanceRef.current = instance;

    expect(canvasInstanceRef.current).not.toBeNull();

    removeCanvasInstance(canvasInstanceRef);

    expect(canvasInstanceRef.current).toBeNull();
  });
});
