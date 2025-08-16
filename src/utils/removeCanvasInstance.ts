import { type CanvasInstanceRef } from "@contracts/CanvasInstanceRef";
import { type SketchProps } from "@contracts/SketchProps";

export function removeCanvasInstance<Props extends SketchProps>(
  canvasInstanceRef: CanvasInstanceRef<Props>
) {
  canvasInstanceRef.current?.remove();
  canvasInstanceRef.current = null;
}
