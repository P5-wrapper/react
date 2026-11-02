import { propsAreEqual } from "@p5-wrapper/common";
import * as React from "react";

const P5CanvasGuard = React.lazy(() => import("@components/P5CanvasGuard"));

export const P5Canvas = React.memo(P5CanvasGuard, propsAreEqual);
