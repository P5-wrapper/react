import { type ReactElement } from "react";
import { type FallbackProps } from "react-error-boundary";

import { type Sketch } from "./Sketch";
import { type SketchProps } from "./SketchProps";

export type InputProps<Props extends SketchProps = SketchProps> = Props & {
  sketch?: Sketch<Props>;
  fallback?: () => ReactElement;
  loading?: () => ReactElement;
  error?: (error: FallbackProps["error"]) => ReactElement;
};
