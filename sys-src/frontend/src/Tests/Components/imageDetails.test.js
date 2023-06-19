import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImageDetails from "../../Components/imageDetails";

describe("imageDetails.js tests", () => {

  beforeEach(() => {
    URL.createObjectURL = jest.fn();
  })

  const testHistogramIDandMetadata = {
    "histId": 'defaultImage.jpg',
    "height": 1,
    "width": 2,
    "channels": 3,
  };

  test("card should be visible", () => {
    render(<ImageDetails setIsLoading={jest.fn()} />);
    const cardVisible = screen.queryByText(/Imagedetails/i);
    expect(cardVisible).toBeVisible();
  });

  test("image should not be visible", () => {
    render(<ImageDetails setIsLoading={jest.fn()} />);
    const imageElement = screen.queryByTestId(/histogram_image/i);
    expect(imageElement).toBeNull();
  });

  test("image should be visible", () => {
    render(<ImageDetails setIsLoading={jest.fn()} currentHistogramIDandMetadata={testHistogramIDandMetadata} />);
    const imageElement = screen.queryByTestId(/histogram_image/i);
    expect(imageElement).toBeVisible();
  });

  test("metadata should not be visible", () => {
    render(<ImageDetails setIsLoading={jest.fn()} />);
    expect(screen.queryByText(/Height/i)).toBeNull();
    expect(screen.queryByText(/Width/i)).toBeNull();
    expect(screen.queryByText(/Channels/i)).toBeNull();
  });

  test("metadata should be visible", () => {
    render(<ImageDetails setIsLoading={jest.fn()} currentHistogramIDandMetadata={testHistogramIDandMetadata} />);
    expect(screen.queryByText(/Height/i)).toBeVisible();
    expect(screen.queryByText(/Width/i)).toBeVisible();
    expect(screen.queryByText(/Channels/i)).toBeVisible();
  });

  test("metadata values should be set to testHistogramIDandMetadata values", () => {
    render(<ImageDetails setIsLoading={jest.fn()} currentHistogramIDandMetadata={testHistogramIDandMetadata} />);
    expect(screen.queryByText(/Height/i).textContent).toBe("Height: 1");
    expect(screen.queryByText(/Width/i).textContent).toBe("Width: 2");
    expect(screen.queryByText(/Channels/i).textContent).toBe("Channels: 3");
  });

});