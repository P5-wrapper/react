import { withoutKeys } from "@utils/withoutKeys";
import { describe, expect, it } from "vitest";

describe("withoutKeys", () => {
  it("Returns the original object if the keys to ignore list is empty", () => {
    const object = { a: 1, b: 2 };
    const updated = withoutKeys(object, []);

    expect(object).toEqual(updated);
  });

  it("Removes all keys provided in the ignore list", () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };
    const updated = withoutKeys(object, ["b", "d"]);

    expect(object).not.toEqual(updated);
    expect(Object.keys(updated)).toEqual(["a", "c"]);
  });
});
