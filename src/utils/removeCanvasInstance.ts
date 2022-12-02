import { type MutableRefObject } from "react";

import { type P5CanvasInstance } from "../contracts/P5CanvasInstance";
import { type SketchProps } from "../contracts/SketchProps";

export function removeCanvasInstance<Props extends SketchProps = SketchProps>(
  canvasInstanceRef: MutableRefObject<P5CanvasInstance<Props> | null>
) {
  canvasInstanceRef.current?.remove();
  canvasInstanceRef.current = null;
}
