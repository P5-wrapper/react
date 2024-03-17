import p5 from "p5";
import { describe, expect, it, vi } from "vitest";

import { createCanvasInstance } from "../../src/utils/createCanvasInstance";

describe("createCanvasInstance", () => {
  it("Should construct a valid implementation of p5 in instance mode", () => {
    const sketch = vi.fn();
    const wrapper = document.createElement("div");
    const instance = createCanvasInstance(sketch, wrapper);

    expect(instance).toBeInstanceOf(p5);
  });
});
