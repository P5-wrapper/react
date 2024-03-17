import { describe, expect, it, vi } from "vitest";

import { logErrorBoundaryError } from "../../src/utils/logErrorBoundaryError";

describe("logErrorBoundaryError", () => {
  it("Logs the error provided in our custom format", () => {
    const error = new Error("oops");
    const errorLogger = vi.fn();
    const errorLoggerSpy = vi
      .spyOn(console, "error")
      .mockImplementation(errorLogger);

    logErrorBoundaryError(error);

    expect(errorLoggerSpy).toHaveBeenCalledOnce();
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[ReactP5Wrapper] The error boundary was triggered. The error message was:"
      )
    );
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining("oops")
    );

    errorLoggerSpy.mockReset();
    errorLoggerSpy.mockRestore();
  });
});
