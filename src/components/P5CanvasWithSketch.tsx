import * as React from "react";
import { CanvasContainerClassName } from "@constants/CanvasContainerClassName";
import { type CanvasContainerRef } from "@contracts/CanvasContainerRef";
import { type P5CanvasInstanceRef } from "@contracts/P5CanvasInstanceRef";
import { type P5CanvasPropsWithSketch } from "@contracts/P5CanvasPropsWithSketch";
import { type SketchProps } from "@contracts/SketchProps";
import { removeP5CanvasInstance } from "@utils/removeP5CanvasInstance";
import { updateP5CanvasInstance } from "@utils/updateP5CanvasInstance";
import { withoutKeys } from "@utils/withoutKeys";

const P5CanvasWithSketch = <Props extends SketchProps>(
  props: P5CanvasPropsWithSketch<Props>
) => {
  const canvasContainerRef: CanvasContainerRef = React.useRef(null);
  const p5CanvasInstanceRef: P5CanvasInstanceRef<Props> = React.useRef(null);
  const sketchProps: SketchProps = React.useMemo(
    () =>
      withoutKeys(props, [
        "sketch",
        "fallback",
        "loading",
        "error",
        "children"
      ]),
    [props]
  );

  React.useEffect(() => {
    p5CanvasInstanceRef.current = updateP5CanvasInstance(
      p5CanvasInstanceRef,
      canvasContainerRef,
      props.sketch
    );
  }, [props.sketch]);

  React.useEffect(() => {
    /** @see https://github.com/P5-wrapper/react/discussions/360 */
    p5CanvasInstanceRef.current?.updateWithProps?.(
      sketchProps as unknown as Props
    );
  }, [sketchProps, canvasContainerRef, p5CanvasInstanceRef]);

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
