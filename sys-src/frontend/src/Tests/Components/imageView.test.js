import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImageView from "../../Components/imageView";

describe("image.js tests", () => {

  test("card should be visible", () => {
    render(<ImageView />);
    const cardVisible = screen.queryByText(/Image/i);
    expect(cardVisible).toBeVisible();
  });

});