import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImageDetails from "../../Components/imageDetails";
import S3Manager from "../../Components/Connections/awsS3";


describe("imageDetails.js tests", () => {

  test("card should be visible", () => {
    render(<ImageDetails />);
    const cardVisible = screen.queryByText(/Imagedetails/i);
    expect(cardVisible).toBeVisible();
  });

  test("no image should be visible", () => {
    
    render(<ImageDetails />);
    const imageElement = screen.queryByTestId(/histogram_image/i);
    expect(imageElement).toBeNull();
  });

  test.skip("image should be visible", async () => {
    const responseMock = {
      "histId": 'defaultImage.jpg',
      "height": 1,
      "width": 2,
      "channels": 3,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({responseMock});

    const spy = jest.spyOn(S3Manager.prototype, "getImageFromS3");
    spy.mockImplementation(() => Promise.resolve("Success!!"));

    render(<ImageDetails currentImageID={ 'defaultImage.jpg' }/>);
    const imageElement = screen.queryByTestId(/histogram_image/i);
    expect(imageElement).toBeVisible();
  });

  test.skip("metadata should not be visible after failed rest call", async () => {
    // mock rest call

    render(<ImageView />);
    const metadataChips = screen.getAllByRole('chip', { hidden: true })
  });

  test.skip("metadata should be visible after successfull rest call", async () => {
    const responseMock = {
      "histId": 'defaultImage.jpg',
      "height": 1,
      "width": 2,
      "channels": 3,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({responseMock});

    render(<ImageDetails currentImageID={ 'defaultImage.jpg' }/>);
    const metadataChips = screen.getAllByRole('chip', { hidden: true })
    expect(metadataChips[0]).toBeVisible();
    expect(metadataChips[1]).toBeVisible();
    expect(metadataChips[2]).toBeVisible();
  });


  test.skip("chip item should display correct metadata values", async () => {
    const responseMock = {
      "histId": 'defaultImage.jpg',
      "height": 1,
      "width": 2,
      "channels": 3,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({responseMock});
    
    render(<ImageDetails currentImageID={ 'defaultImage.jpg' }/>);
    const metadataChips = screen.getAllByRole('chip', { hidden: true })
    expect(metadataChips[0]).toBe(0);
    expect(metadataChips[1]).toBe(0);
    expect(metadataChips[2]).toBe(0);
  });

});