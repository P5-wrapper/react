import { type CanvasContainerRef } from "@contracts/CanvasContainerRef";
import { type CanvasInstanceRef } from "@contracts/CanvasInstanceRef";
import { type Sketch } from "@contracts/Sketch";
import { type SketchProps } from "@contracts/SketchProps";
import { createCanvasInstance } from "@utils/createCanvasInstance";
import { removeCanvasInstance } from "@utils/removeCanvasInstance";

export function updateCanvasInstance<Props extends SketchProps>(
  canvasInstanceRef: CanvasInstanceRef<Props>,
  canvasContainerRef: CanvasContainerRef,
  sketch: Sketch<Props>
) {
  if (canvasContainerRef.current === null) {
    return null;
  }

  removeCanvasInstance(canvasInstanceRef);

  return createCanvasInstance(sketch, canvasContainerRef.current);
}
