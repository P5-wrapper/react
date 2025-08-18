import * as React from "react";
import { propsAreEqual } from "@utils/propsAreEqual";

const ReactP5WrapperGuard = React.lazy(() => import("@components/ReactP5WrapperGuard"));

export const ReactP5Wrapper = React.memo(ReactP5WrapperGuard, propsAreEqual);
