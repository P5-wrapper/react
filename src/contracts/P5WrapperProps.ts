import type { InputProps } from "./InputProps";
import type { SketchProps } from "./SketchProps";
import type { WithChildren } from "./WithChildren";

export type P5WrapperProps<Props extends SketchProps = SketchProps> =
  WithChildren<InputProps<Props>>;
