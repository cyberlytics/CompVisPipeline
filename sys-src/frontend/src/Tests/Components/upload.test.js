import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Upload from "../../Components/upload";

describe("upload.js tests", () => {

  test("card should be visible", () => {
    render(<Upload />);
    const cardVisible = screen.getByTestId(/upload-card/i);
    expect(cardVisible).toBeVisible();
  });

  test("renders upload button", () => {
    render(<Upload />);
    const uploadButton = screen.getByText(/Upload Image/i);
    expect(uploadButton).toBeInTheDocument();
  });

  test("click on upload button", () => {
    render(<Upload />);
    const cardVisible = screen.get
  });



});