import p5 from "p5";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { type CanvasInstanceRef } from "../../src/contracts/CanvasInstanceRef";
import { type WrapperRef } from "../../src/contracts/WrapperRef";
import { SketchProps } from "../../src/main";
import { createCanvasInstance } from "../../src/utils/createCanvasInstance";
import { updateCanvasInstance } from "../../src/utils/updateCanvasInstance";

describe("updateCanvasInstance", () => {
  it("Should update a canvas instance to a new version", () => {
    const sketch = vi.fn();
    const wrapper = document.createElement("div");
    const wrapperRef: WrapperRef = createRef();
    const canvasInstanceRef: CanvasInstanceRef<SketchProps> = createRef();
    const instance = createCanvasInstance(sketch, wrapper);

    wrapperRef.current = wrapper;
    canvasInstanceRef.current = instance;

    const updatedCanvasInstanceRef = updateCanvasInstance(
      canvasInstanceRef,
      wrapperRef,
      sketch
    );

    expect(instance).toBeInstanceOf(p5);
    expect(updatedCanvasInstanceRef).toBeInstanceOf(p5);
    expect(instance).not.toEqual(updatedCanvasInstanceRef);
  });

  it("Should return undefined if the wrapperRef value is null", () => {
    const sketch = vi.fn();
    const wrapper = document.createElement("div");
    const wrapperRef: WrapperRef = createRef();
    const canvasInstanceRef: CanvasInstanceRef<SketchProps> = createRef();
    const instance = createCanvasInstance(sketch, wrapper);

    canvasInstanceRef.current = instance;

    const updatedCanvasInstanceRef = updateCanvasInstance(
      canvasInstanceRef,
      wrapperRef,
      sketch
    );

    expect(updatedCanvasInstanceRef).toBeNull();
  });
});
