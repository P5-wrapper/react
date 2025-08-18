import { type P5CanvasInstance } from "@contracts/P5CanvasInstance";
import { type SketchProps } from "@contracts/SketchProps";

export type Sketch<Props extends SketchProps = SketchProps> = (
  instance: P5CanvasInstance<Props>
) => void;
