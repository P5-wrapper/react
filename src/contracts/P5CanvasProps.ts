import { type P5CanvasProps as CommonP5CanvasProps } from "@p5-wrapper/common";
import { type SketchProps } from "@p5-wrapper/common";
import { type ReactNode } from "react";

export type P5CanvasProps<Props extends SketchProps = SketchProps> =
  CommonP5CanvasProps<Props, ReactNode>;
