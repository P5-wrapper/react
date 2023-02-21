import diff from "microdiff";

import { type P5WrapperProps } from "../contracts/P5WrapperProps";
import { type SketchProps } from "../contracts/SketchProps";

export function propsAreEqual<Props extends SketchProps = SketchProps>(
  previous: P5WrapperProps<Props>,
  next: P5WrapperProps<Props>
) {
  // set deepCompare to true if not specified by props
  const deepCompare = next.deepCompare === undefined ? true : next.deepCompare;

  // shallow
  if (!deepCompare) {
    for (const key in previous) {
      if (previous[key] !== next[key]) {
        return false;
      }
    }
    for (const key in next) {
      if (!(key in previous) && next[key] !== undefined) {
        return false;
      }
    }
    return true;
  }

  //  deep
  const differences = diff(previous, next);
  return differences.length === 0;
}
