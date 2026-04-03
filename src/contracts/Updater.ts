import { type P5CanvasInstance } from "@contracts/P5CanvasInstance";
import { type SketchProps } from "@contracts/SketchProps";

export type Updater<Props extends SketchProps = SketchProps> = (
  instance: P5CanvasInstance<Props>,
  props: Props
) => void;
