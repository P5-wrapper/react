import React from "react";
import { render, screen } from "@testing-library/react";
import P5Wrapper from "../src/index";
import {sketch} from "./__fixtures__/sketch";

describe("P5Wrapper", () => {
  it("renders the component", () => {
    const { container: wrapper, asFragment } = render(<P5Wrapper sketch={sketch} attributes={{}} />);
    const canvas = wrapper.querySelector("canvas");
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(canvas.className).toBe("p5Canvas");
    expect(asFragment()).toMatchSnapshot();
  });
});
