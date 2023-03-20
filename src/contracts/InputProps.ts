import { type Sketch } from "./Sketch";
import { type SketchProps } from "./SketchProps";

export type InputProps<Props extends SketchProps = SketchProps> = Props & {
  sketch?: Sketch<Props>;
  deepCompareObjectsOnPropsDiff?: boolean;
};
