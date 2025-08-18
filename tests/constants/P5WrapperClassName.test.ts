import { P5WrapperClassName } from "@constants/P5WrapperClassName";
import { describe, expect, it } from "vitest";

describe("P5WrapperClassName", () => {
  it("Is exported as a non-empty string", () => {
    expect(P5WrapperClassName).toBeTypeOf("string");
    expect(P5WrapperClassName.length).toBeGreaterThan(0);
  });
});
