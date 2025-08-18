import { type InputProps } from "@contracts/InputProps";
import { type SketchProps } from "@contracts/SketchProps";
import { type WithChildren } from "@contracts/WithChildren";

export type P5WrapperProps<Props extends SketchProps = SketchProps> =
  WithChildren<InputProps<Props>>;
