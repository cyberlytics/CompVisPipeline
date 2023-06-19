import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import ImageView from "../../Components/imageView";
import S3Manager from "../../Components/Connections/awsS3";
import Upload from "../../Components/upload";
import { act } from "react-dom/test-utils";


describe("image.js tests", () => {
  test("card should be visible", () => {
    render(<ImageView />);
    const cardVisible = screen.getByTestId(/imageview-card/i);
    expect(cardVisible).toBeVisible();
  });

  test("no image and no button should be visible", async () => {
    const spy = jest.spyOn(S3Manager.prototype, "getImageFromS3");
    spy.mockImplementation(() => Promise.reject("Error"));

    render(<ImageView />);
    const imageElement = screen.queryByTestId(/uploaded_image/i);
    const buttonElement = screen.queryByText(/download image/i);
    expect(imageElement).toBeNull();
    expect(buttonElement).toBeNull();
  });

  test("image and button should be visible", async () => {
    const spy = jest.spyOn(S3Manager.prototype, "getImageFromS3");
    spy.mockImplementation(() => Promise.resolve("Success!!"));

    render(<ImageView currentImageID={ 'defaultImage.jpg' }/>);
    const imageElement = screen.getByTestId(/uploaded_image/i);
    const buttonElement = screen.getByText(/download image/i);
    expect(imageElement).toBeVisible();
    expect(buttonElement).toBeVisible();
  });

  test("handleDownload function is called", async () => {
    const spy = jest.spyOn(S3Manager.prototype, "getImageFromS3");
    spy.mockImplementation(() => Promise.resolve("Success!!"));
    const mockHandleDownload = jest.fn();
    
    render(<ImageView currentImageID={ 'defaultImage.jpg' } />);
    const buttonElement = screen.getByText(/download image/i);
    buttonElement.onclick = mockHandleDownload;
    fireEvent.click(buttonElement);
    expect(mockHandleDownload).toHaveBeenCalledTimes(1);
  });

});