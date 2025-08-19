import { SketchProps } from "@/main";
import { type CanvasContainerRef } from "@contracts/CanvasContainerRef";
import { type CanvasInstanceRef } from "@contracts/CanvasInstanceRef";
import p5 from "@contracts/p5";
import { createCanvasInstance } from "@utils/createCanvasInstance";
import { updateCanvasInstance } from "@utils/updateCanvasInstance";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

describe("updateCanvasInstance", () => {
  it("Should update a canvas instance to a new version", () => {
    const sketch = vi.fn();
    const wrapper = document.createElement("div");
    const canvasContainerRef: CanvasContainerRef = createRef();
    const canvasInstanceRef: CanvasInstanceRef<SketchProps> = createRef();
    const instance = createCanvasInstance(sketch, wrapper);

    canvasContainerRef.current = wrapper;
    canvasInstanceRef.current = instance;

    const updatedCanvasInstanceRef = updateCanvasInstance(
      canvasInstanceRef,
      canvasContainerRef,
      sketch
    );

    expect(instance).toBeInstanceOf(p5);
    expect(updatedCanvasInstanceRef).toBeInstanceOf(p5);
    expect(instance).not.toEqual(updatedCanvasInstanceRef);
  });

  it("Should return undefined if the canvasContainerRef value is null", () => {
    const sketch = vi.fn();
    const wrapper = document.createElement("div");
    const canvasContainerRef: CanvasContainerRef = createRef();
    const canvasInstanceRef: CanvasInstanceRef<SketchProps> = createRef();
    const instance = createCanvasInstance(sketch, wrapper);

    canvasInstanceRef.current = instance;

    const updatedCanvasInstanceRef = updateCanvasInstance(
      canvasInstanceRef,
      canvasContainerRef,
      sketch
    );

    expect(updatedCanvasInstanceRef).toBeNull();
  });
});
