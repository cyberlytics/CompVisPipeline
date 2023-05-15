import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PipelineSteps from "../../../Components/PipelineSteps/pipelineSteps";

describe("pipelineSteps.js tests", () => {

  test("card should be visible", () => {
    render(<PipelineSteps />);
    const cardVisible = screen.queryByText(/Available Steps/i);
    expect(cardVisible).toBeVisible();
  });

  test("first pipelinestep should be visible", () => {
    render(<PipelineSteps />);
    const firstStepVisible = screen.queryByText(/Salt&Pepper-Noise/i); //todo - anpassen wenn availablePipelineSteps.json angepasst wurde
    expect(firstStepVisible).toBeVisible();
  });

});