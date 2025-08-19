import { type P5CanvasInstanceRef } from "@contracts/P5CanvasInstanceRef";
import { type SketchProps } from "@contracts/SketchProps";

export function removeCanvasInstance<Props extends SketchProps>(
  p5CanvasInstanceRef: P5CanvasInstanceRef<Props>
) {
  p5CanvasInstanceRef.current?.remove();
  p5CanvasInstanceRef.current = null;
}
