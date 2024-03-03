import { describe, expect, it } from "vitest";

import { P5WrapperClassName } from "../../src/constants/P5WrapperClassName";

describe("P5WrapperClassName", () => {
  it("Is exported as a non-empty string", () => {
    expect(P5WrapperClassName).toBeTypeOf("string");
    expect(P5WrapperClassName.length).toBeGreaterThan(0);
  });
});
