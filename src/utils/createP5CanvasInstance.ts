import { type CanvasContainer } from "@contracts/CanvasContainer";
import p5 from "@contracts/p5";
import { type P5CanvasInstance } from "@contracts/P5CanvasInstance";
import { type Sketch } from "@contracts/Sketch";
import { type SketchProps } from "@contracts/SketchProps";

export function createP5CanvasInstance<Props extends SketchProps>(
  sketch: Sketch<Props>,
  canvasContainer: CanvasContainer
): P5CanvasInstance<Props> {
  return new p5(sketch, canvasContainer);
}
