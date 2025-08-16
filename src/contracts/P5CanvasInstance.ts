import p5 from "@contracts/p5";
import { type SketchProps } from "@contracts/SketchProps";

export type P5CanvasInstance<Props extends SketchProps = SketchProps> = p5 & {
  updateWithProps?: (props: Props) => void;
  [key: string]: unknown;
};
