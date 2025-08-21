import { type CanvasContainerRef } from "@contracts/CanvasContainerRef";
import { type P5CanvasInstanceRef } from "@contracts/P5CanvasInstanceRef";
import { type Sketch } from "@contracts/Sketch";
import { type SketchProps } from "@contracts/SketchProps";
import { createCanvasInstance } from "@utils/createCanvasInstance";
import { removeP5CanvasInstance } from "@utils/removeP5CanvasInstance";

export function updateCanvasInstance<Props extends SketchProps>(
  p5CanvasInstanceRef: P5CanvasInstanceRef<Props>,
  canvasContainerRef: CanvasContainerRef,
  sketch: Sketch<Props>
) {
  if (canvasContainerRef.current === null) {
    return null;
  }

  removeP5CanvasInstance(p5CanvasInstanceRef);

  return createCanvasInstance(sketch, canvasContainerRef.current);
}
