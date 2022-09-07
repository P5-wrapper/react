import type p5 from "p5";

import type { SketchProps } from "./SketchProps";

export type P5CanvasInstance<Props extends SketchProps = SketchProps> = p5 & {
  updateWithProps?: (props: Props) => void;
};
