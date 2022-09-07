import type { P5CanvasInstance } from "./P5CanvasInstance";
import type { SketchProps } from "./SketchProps";

export type Sketch<Props extends SketchProps = SketchProps> = (
  instance: P5CanvasInstance<Props>
) => void;
