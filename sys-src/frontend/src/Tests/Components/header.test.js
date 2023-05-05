import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../../Components/header";

describe("header.js tests", () => {

  test("card should be visible", () => {
    render(<Header />);
    const cardVisible = screen.queryByText(/Welcome/i);
    expect(cardVisible).toBeVisible();
  });

});