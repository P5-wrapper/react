import { type P5WrapperProps } from "./P5WrapperProps";
import { type Sketch } from "./Sketch";
import { type SketchProps } from "./SketchProps";

export type P5WrapperPropsWithSketch<Props extends SketchProps = SketchProps> =
  P5WrapperProps<Props> & { sketch: Sketch<Props> };
