import { SketchProps } from "@/main";
import { type CanvasContainerRef } from "@contracts/CanvasContainerRef";
import p5 from "@contracts/p5";
import { type P5CanvasInstanceRef } from "@contracts/P5CanvasInstanceRef";
import { createP5CanvasInstance } from "@utils/createP5CanvasInstance";
import { updateP5CanvasInstance } from "@utils/updateP5CanvasInstance";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

describe("updateP5CanvasInstance", () => {
  it("Should update a P5 canvas instance to a new version", () => {
    const sketch = vi.fn();
    const canvasContainer = document.createElement("div");
    const canvasContainerRef: CanvasContainerRef = createRef();
    const p5CanvasInstanceRef: P5CanvasInstanceRef<SketchProps> = createRef();
    const instance = createP5CanvasInstance(sketch, canvasContainer);

    canvasContainerRef.current = canvasContainer;
    p5CanvasInstanceRef.current = instance;

    const updatedP5CanvasInstanceRef = updateP5CanvasInstance(
      p5CanvasInstanceRef,
      canvasContainerRef,
      sketch
    );

    expect(instance).toBeInstanceOf(p5);
    expect(updatedP5CanvasInstanceRef).toBeInstanceOf(p5);
    expect(instance).not.toEqual(updatedP5CanvasInstanceRef);
  });

  it("Should return undefined if the canvasContainerRef value is null", () => {
    const sketch = vi.fn();
    const canvasContainer = document.createElement("div");
    const canvasContainerRef: CanvasContainerRef = createRef();
    const p5CanvasInstanceRef: P5CanvasInstanceRef<SketchProps> = createRef();
    const instance = createP5CanvasInstance(sketch, canvasContainer);

    p5CanvasInstanceRef.current = instance;

    const updatedP5CanvasInstanceRef = updateP5CanvasInstance(
      p5CanvasInstanceRef,
      canvasContainerRef,
      sketch
    );

    expect(updatedP5CanvasInstanceRef).toBeNull();
  });
});
