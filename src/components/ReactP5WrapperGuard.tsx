import React from "react";

import type { P5WrapperProps } from "../contracts/P5WrapperProps";
import type { SketchProps } from "../contracts/SketchProps";
import { ReactP5Wrapper } from "./ReactP5Wrapper";

export function ReactP5WrapperGuard<Props extends SketchProps = SketchProps>(
  props: P5WrapperProps<Props>
) {
  const { sketch, ...rest } = props;
  if (sketch === undefined) {
    console.error("[ReactP5Wrapper] The `sketch` prop is required.");

    return null;
  }

  return <ReactP5Wrapper sketch={sketch} {...rest} />;
}
