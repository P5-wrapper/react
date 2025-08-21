import p5 from "@contracts/p5";
import { createP5CanvasInstance } from "@utils/createP5CanvasInstance";
import { describe, expect, it, vi } from "vitest";

describe("createP5CanvasInstance", () => {
  it("Should construct a valid implementation of p5 in instance mode", () => {
    const sketch = vi.fn();
    const wrapper = document.createElement("div");
    const instance = createP5CanvasInstance(sketch, wrapper);

    expect(instance).toBeInstanceOf(p5);
  });
});
