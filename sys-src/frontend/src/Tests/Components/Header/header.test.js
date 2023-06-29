import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../../../Components/Header/header";
import userEvent from "@testing-library/user-event";

describe("header.js tests", () => {

  beforeEach(() => {
    console.error = jest.fn(); //Do not print connection to port 80 failed error.
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  test("should handle login click", () => {
    render(<Header />);
    expect(screen.queryByText(/Login as developer/i)).toBeNull();
    act(() => {
      userEvent.click(screen.getByTestId("login-button"));
    });
    expect(screen.queryByText(/Login as developer/i)).toBeVisible();
  });

  test("should handle logout click", () => {
    const setDevelopModeMock = jest.fn();
    render(<Header developMode={true} setDevelopMode={setDevelopModeMock} />);
    act(() => {
      userEvent.click(screen.getByTestId("logout-button"));
    });
    expect(setDevelopModeMock).toHaveBeenCalledWith(false);
  });

  test("should open information popup", () => {
    render(<Header />);
    expect(screen.queryByText(/Welcome to our/i)).toBeNull();
    act(() => {
      userEvent.click(screen.getByTestId("info-button"));
    });
    expect(screen.queryByText(/Welcome to our/i)).toBeVisible();
  });

  test("should reload the window on refresh button click", () => {
    Object.defineProperty(window, "location", {
      value: { reload: jest.fn() },
      writable: true,
    });
    render(<Header />);
    act(() => {
      userEvent.click(screen.getByTestId("refresh-button"));
    });
    expect(window.location.reload).toHaveBeenCalled();
  });

  test("should switch theme from lightmode to darkmode", () => {
    const setThemeMock = jest.fn();
    render(<Header theme={false} setTheme={setThemeMock} />);

    let darkModeButton = screen.queryByTestId("darkmode-button");
    let lightModeButton = screen.queryByTestId("lightmode-button");

    expect(darkModeButton).toBeNull();
    expect(lightModeButton).toBeVisible();

    act(() => {
      userEvent.click(lightModeButton);
    });
    expect(setThemeMock).toHaveBeenCalledWith(true);
  });

  test("should switch theme from darkmode to lightmode", () => {
    const setThemeMock = jest.fn();
    render(<Header theme={true} setTheme={setThemeMock} />);

    let darkModeButton = screen.queryByTestId("darkmode-button");
    let lightModeButton = screen.queryByTestId("lightmode-button");

    expect(lightModeButton).toBeNull();
    expect(darkModeButton).toBeVisible();

    act(() => {
      userEvent.click(darkModeButton);
    });
    expect(setThemeMock).toHaveBeenCalledWith(false);
  });

  test("should fetch license text", async () => {
    const mockLicenseText = "Mock License Text";
    global.fetch = jest.fn(() => Promise.resolve({ text: () => Promise.resolve(mockLicenseText), }));

    await act(async () => {
      render(<Header />);
    });

    expect(global.fetch).toHaveBeenCalledWith("license.txt");
  });

});