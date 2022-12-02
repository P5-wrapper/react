import { type ReactNode } from "react";

export type WithChildren<T = unknown> = T & { children?: ReactNode };
