import { type CanvasInstanceRef } from "@contracts/CanvasInstanceRef";
import { type Sketch } from "@contracts/Sketch";
import { type SketchProps } from "@contracts/SketchProps";
import { type WrapperRef } from "@contracts/WrapperRef";

import { createCanvasInstance } from "./createCanvasInstance";
import { removeCanvasInstance } from "./removeCanvasInstance";

export function updateCanvasInstance<Props extends SketchProps>(
  canvasInstanceRef: CanvasInstanceRef<Props>,
  wrapperRef: WrapperRef,
  sketch: Sketch<Props>
) {
  if (wrapperRef.current === null) {
    return null;
  }

  removeCanvasInstance(canvasInstanceRef);

  return createCanvasInstance(sketch, wrapperRef.current);
}
