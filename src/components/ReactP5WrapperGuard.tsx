import * as React from "react";

import { type P5WrapperProps } from "../contracts/P5WrapperProps";
import { type P5WrapperPropsWithSketch } from "../contracts/P5WrapperPropsWithSketch";
import { type SketchProps } from "../contracts/SketchProps";
import { ReactP5WrapperWithSketch } from "./ReactP5WrapperWithSketch";

export function ReactP5WrapperGuard<Props extends SketchProps = SketchProps>(
  props: P5WrapperProps<Props>
) {
  if (props.sketch === undefined) {
    console.error("[ReactP5Wrapper] The `sketch` prop is required.");

    return props.fallback ?? null;
  }

  return (
    <ReactP5WrapperWithSketch
      /** @see https://github.com/P5-wrapper/react/issues/207 */
      {...(props as unknown as P5WrapperPropsWithSketch<Props>)}
    />
  );
}
