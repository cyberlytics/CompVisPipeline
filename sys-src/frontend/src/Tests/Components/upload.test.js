import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Upload from "../../Components/upload";

describe("upload.js tests", () => {

  test("card should be visible", () => {
    render(<Upload />);
    const cardVisible = screen.queryByText(/Upload/i);
    expect(cardVisible).toBeVisible();
  });

});