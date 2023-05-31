import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("handler function is called", async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {});

    const mockHandleUpload = jest.fn();
    const mockSetOriginalImageID = jest.fn();

    const mockPushImageToS3 = jest.fn();

    render(<Upload setOriginalImageID={mockSetOriginalImageID} />);
    const file = new File(["test data body"], "test.jpg", {type: "image/jpeg"});

    const inputElement = screen.getByLabelText(/Upload Image/i);
    inputElement.addEventListener("change", mockHandleUpload);
    userEvent.upload(inputElement, {target: {files: [file]}});

    expect(mockHandleUpload).toHaveBeenCalledTimes(1);
  });

});