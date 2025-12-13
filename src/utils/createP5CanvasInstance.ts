import { type CanvasContainer } from "@contracts/CanvasContainer";
import { p5 } from "@contracts/p5";
import { type P5CanvasInstance } from "@contracts/P5CanvasInstance";
import { type Sketch } from "@contracts/Sketch";
import { type SketchProps } from "@contracts/SketchProps";

export function createP5CanvasInstance<Props extends SketchProps>(
  sketch: Sketch<Props>,
  canvasContainer: CanvasContainer
): P5CanvasInstance<Props> {
  // @see https://github.com/processing/p5.js/pull/7863
  // @ts-expect-error The p5 library changes from the above PR caused some issues with the inferred types.
  return new p5(sketch, canvasContainer);
}
