import { type ReactNode } from "react";
import { type FallbackProps } from "react-error-boundary";

import { type Sketch } from "./Sketch";
import { type SketchProps } from "./SketchProps";

export type InputProps<Props extends SketchProps> = Props & {
  sketch?: Sketch<Props>;
  fallback?: () => ReactNode;
  loading?: () => ReactNode;
  error?: (error: FallbackProps["error"]) => ReactNode;
};
