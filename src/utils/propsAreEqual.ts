import { type P5CanvasProps } from "@contracts/P5CanvasProps";
import { type SketchProps } from "@contracts/SketchProps";
import diff from "microdiff";

export function propsAreEqual<Props extends SketchProps>(
  previous: P5CanvasProps<Props>,
  next: P5CanvasProps<Props>
) {
  const differences = diff(previous, next);

  return differences.length === 0;
}
