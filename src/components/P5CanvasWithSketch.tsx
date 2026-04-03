import * as React from "react";
import { CanvasContainerClassName } from "@constants/CanvasContainerClassName";
import { type CanvasContainerRef } from "@contracts/CanvasContainerRef";
import { type P5CanvasInstanceRef } from "@contracts/P5CanvasInstanceRef";
import { type Sketch } from "@contracts/Sketch";
import { type SketchProps } from "@contracts/SketchProps";
import { type Updater } from "@contracts/Updater";
import { removeP5CanvasInstance } from "@utils/removeP5CanvasInstance";
import { updateP5CanvasInstance } from "@utils/updateP5CanvasInstance";
import { type ReactNode } from "react";

interface P5CanvasWithSketchProps {
  sketch: Sketch;
  updater?: Updater;
  sketchProps: SketchProps;
  children?: ReactNode;
}

const P5CanvasWithSketch = (props: P5CanvasWithSketchProps) => {
  const canvasContainerRef: CanvasContainerRef = React.useRef(null);
  const p5CanvasInstanceRef: P5CanvasInstanceRef<SketchProps> =
    React.useRef(null);
  const updaterRef = React.useRef<Updater | undefined>(props.updater);

  React.useEffect(() => {
    updaterRef.current = props.updater;
  }, [props.updater]);

  React.useEffect(() => {
    p5CanvasInstanceRef.current = updateP5CanvasInstance(
      p5CanvasInstanceRef,
      canvasContainerRef,
      props.sketch
    );
  }, [props.sketch]);

  React.useEffect(() => {
    /** @see https://github.com/P5-wrapper/react/discussions/360 */
    p5CanvasInstanceRef.current?.updateWithProps?.(props.sketchProps);

    if (updaterRef.current && p5CanvasInstanceRef.current) {
      updaterRef.current(p5CanvasInstanceRef.current, props.sketchProps);
    }
  }, [props.sketchProps, canvasContainerRef, p5CanvasInstanceRef]);

  React.useEffect(() => () => removeP5CanvasInstance(p5CanvasInstanceRef), []);

  return (
    <div
      ref={canvasContainerRef}
      className={CanvasContainerClassName}
      data-testid="canvas-container"
    >
      {props.children}
    </div>
  );
};

export default P5CanvasWithSketch;
