import React from "react";

import { type P5WrapperProps } from "../contracts/P5WrapperProps";
import { type SketchProps } from "../contracts/SketchProps";
import { ReactP5WrapperWithSketch } from "./ReactP5WrapperWithSketch";

export function ReactP5WrapperGuard<Props extends SketchProps = SketchProps>(
  props: P5WrapperProps<Props>
) {
  const { sketch, ...rest } = props;

  if (sketch === undefined) {
    console.error("[ReactP5Wrapper] The `sketch` prop is required.");

    return null;
  }

  return <ReactP5WrapperWithSketch sketch={sketch} {...rest} />;
}
