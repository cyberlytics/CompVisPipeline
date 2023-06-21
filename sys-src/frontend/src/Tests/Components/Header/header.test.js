import React from "react";
import { render, screen, debug, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../../../Components/Header/header";
import userEvent from "@testing-library/user-event";

describe("header.js tests", () => {

  test("card should be visible", () => {
    render(<Header />);
    const cardVisible = screen.queryByText(/Computer Vision Pipeline/i);
    expect(cardVisible).toBeVisible();
  });

  test("should reload window on click", () => {
    const reloadMock = jest.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadMock },
      writable: true,
    });
    render(<Header />);
    userEvent.click(screen.getByTestId("refresh-button"));
    expect(reloadMock).toHaveBeenCalled();
  });

  test("license icon should be visible", () => {
    render(<Header />);
    const licenseVisible = screen.getByTestId("license-button");
    expect(licenseVisible).toBeVisible();
  })

  test("license icon should show popup on click", () => {
    render(<Header />);
    act(() => {
      userEvent.click(screen.getByTestId("license-button"));
    });
    const popUpVisible = screen.queryByText(/License/);
    expect(popUpVisible).toBeVisible();
  })

});