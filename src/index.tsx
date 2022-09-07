import { memo } from "react";

import { ReactP5WrapperGuard } from "./components/ReactP5WrapperGuard";
import { propsAreEqual } from "./utils/propsAreEqual";

export { P5WrapperClassName } from "./constants/P5WrapperClassName";
export type { P5CanvasInstance } from "./contracts/P5CanvasInstance";
export type { P5WrapperProps } from "./contracts/P5WrapperProps";
export type { Sketch } from "./contracts/Sketch";
export type { SketchProps } from "./contracts/SketchProps";

export const ReactP5Wrapper = memo(ReactP5WrapperGuard, propsAreEqual);
