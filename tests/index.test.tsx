import React from "react";
import { render } from "@testing-library/react";
import { ReactP5Wrapper } from "../src/index";
import p5 from "p5";

describe("P5Wrapper", () => {
  it("renders the component", () => {
    const { container: wrapper, asFragment } = render(
      <ReactP5Wrapper
        sketch={(p5: p5) => {
          p5.setup = () => p5.createCanvas(720, 400);
        }}
      />
    );
    const canvas = wrapper.querySelector("canvas");

    expect(canvas).not.toBeNull();
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(asFragment()).toMatchSnapshot();
  });
});
