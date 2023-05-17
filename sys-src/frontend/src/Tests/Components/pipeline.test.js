import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pipeline from "../../Components/pipeline";

describe("pipeline.js tests", () => {

  test.skip("card should be visible", () => {
    render(<Pipeline />);
    const cardVisible = screen.queryByText(/Pipeline/i);
    expect(cardVisible).toBeVisible();
  });

});