import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../../../Components/Header/header";

describe("header.js tests", () => {

  test("card should be visible", () => {
    render(<Header />);
    const cardVisible = screen.queryByText(/Computer Vision Pipeline/i);
    expect(cardVisible).toBeVisible();
  });

});