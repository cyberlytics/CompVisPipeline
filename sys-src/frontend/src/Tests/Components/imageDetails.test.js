import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImageDetails from "../../Components/imageDetails";

describe("imageDetails.js tests", () => {

  test("card should be visible", () => {
    render(<ImageDetails />);
    const cardVisible = screen.queryByText(/Imagedetails/i);
    expect(cardVisible).toBeVisible();
  });

});