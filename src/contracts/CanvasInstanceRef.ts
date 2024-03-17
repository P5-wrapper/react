import { type MutableRefObject } from "react";

import { type P5CanvasInstance } from "./P5CanvasInstance";
import { type SketchProps } from "./SketchProps";

export type CanvasInstanceRef<Props extends SketchProps = SketchProps> =
  MutableRefObject<P5CanvasInstance<Props> | null>;
