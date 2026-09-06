import { p5 } from "@p5-wrapper/common";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "vitest-canvas-mock";

// Disables P5 "friendly errors" to avoid DOM-related script scanning that causes unhandled rejections in the tests.
// @see https://p5js.org/reference/p5/disableFriendlyErrors/
p5.disableFriendlyErrors = true;

afterEach(() => cleanup());
