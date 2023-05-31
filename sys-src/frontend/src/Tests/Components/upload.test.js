import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import Upload from "../../Components/upload";
import S3Manager from "../../Components/Connections/awsS3";
import { act } from "react-dom/test-utils";


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

  test("renders default image button", () => {
    render(<Upload />);
    const defaultImageButton = screen.getByText(/Default Image/i);
    expect(defaultImageButton).toBeInTheDocument();
  });

  test("handler function is called - S3Manager.pushImageToS3 -> resolve", async () => {
    // create a mock function on the S3Manager class pushImageToS3 method to return a resolved promise
    const spy = jest.spyOn(S3Manager.prototype, "pushImageToS3");
    spy.mockImplementation(() => Promise.resolve("Success"));

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

  test("handler function is called - S3Manager.pushImageToS3 -> reject", async () => {
    // create a mock function on the S3Manager class pushImageToS3 method to return a rejected promise
    const spy = jest.spyOn(S3Manager.prototype, "pushImageToS3");
    spy.mockImplementation(() => Promise.reject("Error"));

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

  test("handler function is called - defaultImage", async () => {
    const mockHandleDefaultUpload = jest.fn();
    const mockSetOriginalImageID = jest.fn();

    render(<Upload setOriginalImageID={mockSetOriginalImageID} />);
    
    const defaultImageButton = screen.getByText(/Default Image/i);
    defaultImageButton.addEventListener("click", mockHandleDefaultUpload);
    
    act(() => {
      userEvent.click(defaultImageButton);
    });
    
    expect(mockHandleDefaultUpload).toHaveBeenCalledTimes(1);
  });

});