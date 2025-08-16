import { type P5WrapperProps } from "@contracts/P5WrapperProps";
import { type Sketch } from "@contracts/Sketch";
import { type SketchProps } from "@contracts/SketchProps";

export type P5WrapperPropsWithSketch<Props extends SketchProps> =
  P5WrapperProps<Props> & { sketch: Sketch<Props> };
