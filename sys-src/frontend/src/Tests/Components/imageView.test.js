import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ImageView from "../../Components/imageView";
import S3Manager from "../../Components/Connections/awsS3";
import Upload from "../../Components/upload";


describe("image.js tests", () => {
  test("card should be visible", () => {
    render(<ImageView />);
    const cardVisible = screen.getByTestId(/imageview-card/i);
    expect(cardVisible).toBeVisible();
  });

  test("no image should be visible", async () => {
    const spy = jest.spyOn(S3Manager.prototype, "getImageFromS3");
    spy.mockImplementation(() => Promise.reject("Error"));

    render(<ImageView />);
    const imageElement = screen.queryByRole("img");
    expect(imageElement).toBeNull();
  });

  test("image should be visible", async () => {
    const spy = jest.spyOn(S3Manager.prototype, "getImageFromS3");
    spy.mockImplementation(() => Promise.resolve("Success!!"));

    render(<ImageView currentImageID={ 'defaultImage.jpg' }/>);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeVisible();
  });
});