import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Calculator from "../../Components/calculator";

describe("calculator.js tests", () => {

  test("card should be visible", () => {
    render(<Calculator />);
    const cardVisible = screen.queryByText(/Calculator/i);
    expect(cardVisible).toBeVisible();
  });

});