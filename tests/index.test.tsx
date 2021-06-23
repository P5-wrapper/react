import React from "react";
import { render } from "@testing-library/react";
import { ReactP5Wrapper } from "../src/index";
import { sketch } from "./__fixtures__/sketch";

describe("P5Wrapper", () => {
  it("renders the component", () => {
    const { container: wrapper, asFragment } = render(
      <ReactP5Wrapper sketch={sketch} />
    );
    const canvas = wrapper.querySelector("canvas");

    expect(canvas).not.toBeNull();
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(asFragment()).toMatchSnapshot();
  });
});
