import { memo } from "react";

import { propsAreEqual } from "../utils/propsAreEqual";
import { ReactP5WrapperGuard } from "./ReactP5WrapperGuard";

export const ReactP5Wrapper = memo(ReactP5WrapperGuard, propsAreEqual);
