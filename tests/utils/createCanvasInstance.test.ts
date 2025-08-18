import p5 from "@contracts/p5";
import { createCanvasInstance } from "@utils/createCanvasInstance";
import { describe, expect, it, vi } from "vitest";

describe("createCanvasInstance", () => {
  it("Should construct a valid implementation of p5 in instance mode", () => {
    const sketch = vi.fn();
    const wrapper = document.createElement("div");
    const instance = createCanvasInstance(sketch, wrapper);

    expect(instance).toBeInstanceOf(p5);
  });
});
