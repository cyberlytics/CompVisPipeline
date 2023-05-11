import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StartPipeline from "../../Components/startPipeline";

describe("startPipeline.js tests", () => {

  test("card should be visible", () => {
    render(<StartPipeline />);
    const cardVisible = screen.queryByText(/Start Pipeline/i);
    expect(cardVisible).toBeVisible();
  });

});