import { type P5CanvasProps } from "@contracts/P5CanvasProps";
import { propsAreEqual } from "@utils/propsAreEqual";
import { describe, expect, it, vi } from "vitest";

describe("propsAreEqual", () => {
  it("Returns true when the current and next props are the same", () => {
    const sketch = vi.fn();
    const current: P5CanvasProps = { sketch };
    const next: P5CanvasProps = { sketch };
    const equal = propsAreEqual(current, next);

    expect(equal).toBe(true);
  });

  it("Returns false when the current and next props are not the same", () => {
    const current: P5CanvasProps = {
      sketch: () => {
        return;
      }
    };
    const next: P5CanvasProps = {
      sketch: () => {
        return;
      }
    };
    const equal = propsAreEqual(current, next);

    expect(equal).toBe(false);
  });
});
