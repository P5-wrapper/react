import { CanvasContainerClassName } from "@constants/CanvasContainerClassName";
import { describe, expect, it } from "vitest";

describe("CanvasContainerClassName", () => {
  it("Is exported as a non-empty string", () => {
    expect(CanvasContainerClassName).toBeTypeOf("string");
    expect(CanvasContainerClassName.length).toBeGreaterThan(0);
  });
});
