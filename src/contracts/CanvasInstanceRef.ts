import { MutableRefObject } from "react";

import { P5CanvasInstance } from "./P5CanvasInstance";
import { SketchProps } from "./SketchProps";

export type CanvasInstanceRef<Props extends SketchProps = SketchProps> =
  MutableRefObject<P5CanvasInstance<Props> | null>;
