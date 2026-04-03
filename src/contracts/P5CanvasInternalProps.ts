import { type Sketch } from "@contracts/Sketch";
import { type SketchProps } from "@contracts/SketchProps";
import { type Updater } from "@contracts/Updater";
import { type ReactNode } from "react";

export interface P5CanvasInternalProps<
  Props extends SketchProps = SketchProps
> {
  sketch?: Sketch<Props>;
  updater?: Updater<Props>;
  fallback?: () => ReactNode;
  loading?: () => ReactNode;
  error?: (error: unknown) => ReactNode;
  children?: ReactNode;
}
