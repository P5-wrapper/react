import { type P5CanvasInstance } from "@contracts/P5CanvasInstance";
import { type SketchProps } from "@contracts/SketchProps";
import { type RefObject } from "react";

export type CanvasInstanceRef<Props extends SketchProps> =
  RefObject<P5CanvasInstance<Props> | null>;
