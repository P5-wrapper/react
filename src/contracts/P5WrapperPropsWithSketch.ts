import { type P5CanvasProps } from "@contracts/P5CanvasProps";
import { type Sketch } from "@contracts/Sketch";
import { type SketchProps } from "@contracts/SketchProps";

export type P5WrapperPropsWithSketch<Props extends SketchProps> =
  P5CanvasProps<Props> & { sketch: Sketch<Props> };
