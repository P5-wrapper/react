import { type P5CanvasInternalProps } from "@contracts/P5CanvasInternalProps";
import { type SketchProps } from "@contracts/SketchProps";

export type P5CanvasProps<Props extends SketchProps = SketchProps> =
  P5CanvasInternalProps<Props> & Props;
