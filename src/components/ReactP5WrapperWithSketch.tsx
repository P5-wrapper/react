import * as React from "react";

import { P5WrapperClassName } from "../constants/P5WrapperClassName";
import { type CanvasInstanceRef } from "../contracts/CanvasInstanceRef";
import { type P5WrapperPropsWithSketch } from "../contracts/P5WrapperPropsWithSketch";
import { type SketchProps } from "../contracts/SketchProps";
import { type WrapperRef } from "../contracts/WrapperRef";
import { removeCanvasInstance } from "../utils/removeCanvasInstance";
import { updateCanvasInstance } from "../utils/updateCanvasInstance";
import { withoutKeys } from "../utils/withoutKeys";

const ReactP5WrapperWithSketch = <Props extends SketchProps>(
  props: P5WrapperPropsWithSketch<Props>
) => {
  const wrapperRef: WrapperRef = React.useRef(null);
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
      wrapperRef,
      props.sketch
    );
  }, [props.sketch]);

  React.useEffect(() => {
    /** @see https://github.com/P5-wrapper/react/discussions/360 */
    canvasInstanceRef.current?.updateWithProps?.(
      userProvidedProps as unknown as Props
    );
  }, [userProvidedProps, wrapperRef, canvasInstanceRef]);

  React.useEffect(() => () => removeCanvasInstance(canvasInstanceRef), []);

  return (
    <div ref={wrapperRef} className={P5WrapperClassName} data-testid="wrapper">
      {props.children}
    </div>
  );
};

export default ReactP5WrapperWithSketch;
