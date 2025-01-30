import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  MockInstance,
  vi
} from "vitest";

import { logErrorBoundaryError } from "../../src/utils/logErrorBoundaryError";

describe("logErrorBoundaryError", () => {
  let errorLoggerSpy: MockInstance<typeof console.error>;

  beforeEach(() => {
    const errorLogger = vi.fn();

    errorLoggerSpy = vi.spyOn(console, "error").mockImplementation(errorLogger);
  });

  afterEach(() => {
    errorLoggerSpy.mockReset();
    errorLoggerSpy.mockRestore();
  });

  it("Logs the error correctly when provided an `Error` instance", () => {
    const error = new Error("An error message");

    logErrorBoundaryError(error);

    expect(errorLoggerSpy).toHaveBeenCalledOnce();
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[ReactP5Wrapper] The error boundary was triggered. The error message was:"
      )
    );
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Error("An error message")`)
    );
  });

  it("Logs the error correctly when provided a `String` instance", () => {
    logErrorBoundaryError("A string message");

    expect(errorLoggerSpy).toHaveBeenCalledOnce();
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[ReactP5Wrapper] The error boundary was triggered. The error message was:"
      )
    );
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(`String("A string message")`)
    );
  });

  it("Logs the error correctly when provided a `Number` instance", () => {
    logErrorBoundaryError(123);

    expect(errorLoggerSpy).toHaveBeenCalledOnce();
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[ReactP5Wrapper] The error boundary was triggered. The error message was:"
      )
    );
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining("Number(123)")
    );
  });

  it("Logs the error correctly when provided a `BigInt` instance", () => {
    logErrorBoundaryError(BigInt(123));

    expect(errorLoggerSpy).toHaveBeenCalledOnce();
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[ReactP5Wrapper] The error boundary was triggered. The error message was:"
      )
    );
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining("BigInt(123)")
    );
  });

  it("Logs the error correctly when provided an `Object` instance", () => {
    logErrorBoundaryError({ a: 1, b: 2 });

    expect(errorLoggerSpy).toHaveBeenCalledOnce();
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[ReactP5Wrapper] The error boundary was triggered. The error message was:"
      )
    );
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining('Object({"a":1,"b":2})')
    );
  });

  it("Logs the error correctly when provided an `Array` instance", () => {
    logErrorBoundaryError([1, 2, 3]);

    expect(errorLoggerSpy).toHaveBeenCalledOnce();
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[ReactP5Wrapper] The error boundary was triggered. The error message was:"
      )
    );
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining("Array([1,2,3])")
    );
  });

  it("Logs the error correctly when provided an `Set` instance", () => {
    logErrorBoundaryError(new Set([1, 2, 3]));

    expect(errorLoggerSpy).toHaveBeenCalledOnce();
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[ReactP5Wrapper] The error boundary was triggered. The error message was:"
      )
    );
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining("Set([1,2,3])")
    );
  });

  it("Logs the error correctly when provided a `Symbol` instance", () => {
    logErrorBoundaryError(Symbol("test"));

    expect(errorLoggerSpy).toHaveBeenCalledOnce();
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[ReactP5Wrapper] The error boundary was triggered. The error message was:"
      )
    );
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining("Symbol(test)")
    );
  });

  it("Logs the error correctly when provided an unhandled `unknown` instance", () => {
    logErrorBoundaryError(() => 123);

    expect(errorLoggerSpy).toHaveBeenCalledOnce();
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[ReactP5Wrapper] The error boundary was triggered. The error message was:"
      )
    );
    expect(errorLoggerSpy).toHaveBeenCalledWith(
      expect.stringContaining("Unknown(function)")
    );
  });
});
