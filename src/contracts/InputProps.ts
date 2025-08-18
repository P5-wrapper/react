import { type Sketch } from "@contracts/Sketch";
import { type SketchProps } from "@contracts/SketchProps";
import { type ReactNode } from "react";
import { type FallbackProps } from "react-error-boundary";

export type InputProps<Props extends SketchProps> = Props & {
  sketch?: Sketch<Props>;
  fallback?: () => ReactNode;
  loading?: () => ReactNode;
  error?: (error: FallbackProps["error"]) => ReactNode;
};
