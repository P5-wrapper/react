import * as React from "react";
import { CanvasContainerClassName } from "@constants/CanvasContainerClassName";
import { type CanvasContainerRef } from "@contracts/CanvasContainerRef";
import { type CanvasInstanceRef } from "@contracts/CanvasInstanceRef";
import { type P5CanvasPropsWithSketch } from "@contracts/P5CanvasPropsWithSketch";
import { type SketchProps } from "@contracts/SketchProps";
import { removeCanvasInstance } from "@utils/removeCanvasInstance";
import { updateCanvasInstance } from "@utils/updateCanvasInstance";
import { withoutKeys } from "@utils/withoutKeys";

const P5CanvasWithSketch = <Props extends SketchProps>(
  props: P5CanvasPropsWithSketch<Props>
) => {
  const canvasContainerRef: CanvasContainerRef = React.useRef(null);
  const canvasInstanceRef: CanvasInstanceRef<Props> = React.useRef(null);
  const userProvidedProps: SketchProps = React.useMemo(
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
    canvasInstanceRef.current = updateCanvasInstance(
      canvasInstanceRef,
      canvasContainerRef,
      props.sketch
    );
  }, [props.sketch]);

  React.useEffect(() => {
    /** @see https://github.com/P5-wrapper/react/discussions/360 */
    canvasInstanceRef.current?.updateWithProps?.(
      userProvidedProps as unknown as Props
    );
  }, [userProvidedProps, canvasContainerRef, canvasInstanceRef]);

  React.useEffect(() => () => removeCanvasInstance(canvasInstanceRef), []);

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
