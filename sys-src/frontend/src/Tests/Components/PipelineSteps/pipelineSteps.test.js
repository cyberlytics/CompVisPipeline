import React from 'react'
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PipelineSteps from "../../../Components/PipelineSteps/pipelineSteps";

describe("pipelineSteps.js tests", () => {

  test("card should be visible", () => {
    render(<PipelineSteps />);
    const cardVisible = screen.queryByText(/Available Steps/i);
    expect(cardVisible).toBeVisible();
  });

});