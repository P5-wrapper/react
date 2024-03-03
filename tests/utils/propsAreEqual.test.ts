import { describe, expect, it, vi } from "vitest";

import { type P5WrapperProps } from "../../src/contracts/P5WrapperProps";
import { propsAreEqual } from "../../src/utils/propsAreEqual";

describe("propsAreEqual", () => {
  it("Returns true when the current and next props are the same", () => {
    const sketch = vi.fn();
    const current: P5WrapperProps = { sketch };
    const next: P5WrapperProps = { sketch };
    const equal = propsAreEqual(current, next);

    expect(equal).toBe(true);
  });

  it("Returns false when the current and next props are not the same", () => {
    const current: P5WrapperProps = { sketch: () => {} };
    const next: P5WrapperProps = { sketch: () => {} };
    const equal = propsAreEqual(current, next);

    expect(equal).toBe(false);
  });
});
