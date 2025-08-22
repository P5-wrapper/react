import { type P5CanvasInstance } from "@contracts/P5CanvasInstance";
import { type SketchProps } from "@contracts/SketchProps";
import { type RefObject } from "react";

/** Ref to the active p5.js sketch instance controlling the canvas */
export type P5CanvasInstanceRef<Props extends SketchProps> =
  RefObject<P5CanvasInstance<Props> | null>;
