import React from "react";
import { render } from "@testing-library/react";
import P5Wrapper from "./index";
import sketch from "./__fixtures__/sketch";

describe("P5Wrapper", () => {
  xit("renders the component", () => {
    const props = {
      sketch: sketch,
      attributes: { rotation: "10" }
    };

    render(<P5Wrapper {...props} />);
  });
});
