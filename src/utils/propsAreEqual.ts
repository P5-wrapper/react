import { type P5WrapperProps } from "@contracts/P5WrapperProps";
import { type SketchProps } from "@contracts/SketchProps";
import diff from "microdiff";

export function propsAreEqual<Props extends SketchProps>(
  previous: P5WrapperProps<Props>,
  next: P5WrapperProps<Props>
) {
  const differences = diff(previous, next);

  return differences.length === 0;
}
