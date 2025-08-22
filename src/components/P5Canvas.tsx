import * as React from "react";
import { propsAreEqual } from "@utils/propsAreEqual";

const P5CanvasGuard = React.lazy(() => import("@components/P5CanvasGuard"));

export const P5Canvas = React.memo(P5CanvasGuard, propsAreEqual);
