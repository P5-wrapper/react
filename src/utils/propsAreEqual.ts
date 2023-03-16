import diff from "microdiff";

import { type P5WrapperProps } from "../contracts/P5WrapperProps";
import { type SketchProps } from "../contracts/SketchProps";

function shallowEqual<Props extends SketchProps = SketchProps>(
  previous: P5WrapperProps<Props>,
  next: P5WrapperProps<Props>
) {
  const previousKeys = Object.keys(previous);
  const nextKeys = Object.keys(next);

  if (previousKeys.length !== nextKeys.length) {
    return false;
  }

  for (const key of previousKeys) {
    if (previous[key] !== next[key]) {
      return false;
    }
  }

  return true;
}

function deepEqual<Props extends SketchProps = SketchProps>(
  previous: P5WrapperProps<Props>,
  next: P5WrapperProps<Props>
) {
  return diff(previous, next).length === 0;
}

export function propsAreEqual<Props extends SketchProps = SketchProps>(
  previous: P5WrapperProps<Props>,
  next: P5WrapperProps<Props>
) {
  const deepCompareObjectsOnPropsDiff =
    next.deepCompareObjectsOnPropsDiff ?? true;

  return deepCompareObjectsOnPropsDiff
    ? deepEqual(previous, next)
    : shallowEqual(previous, next);
}
