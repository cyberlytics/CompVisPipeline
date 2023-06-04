import React, { useState } from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginWindow from "../../ModalWindow/LoginWindow";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const TestWrapper = ({ testState, setTestState }) => {
  let testopen = true;

  return (
    <LoginWindow open={testopen} onClose={() => {}} setState={setTestState} />
  );
};

describe("LoginWindow.js tests", () => {
  let testState;
  let setTestState;

  beforeEach(() => {
    testState = false;
    setTestState = jest.fn();
    cleanup();
  });

  test("login window should be visible", () => {
    render(<TestWrapper testState={testState} setTestState={setTestState} />);
    const loginVisible = screen.queryByText(/Login as developer/i);
    expect(loginVisible).toBeVisible();
  });

  test("login with false credentials should not change testState", async () => {
    render(<TestWrapper testState={testState} setTestState={setTestState} />);

    await act(async () => {
      console.error = jest.fn(); // Stummschaltung der Warnungen
      userEvent.click(screen.getByTestId("login-button"));
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.error.mockRestore(); // Wiederherstellen der Warnungen
    });

    expect(testState).toBe(false);
  });

  test("login with correct credentials should set testState to true", async () => {
    render(<TestWrapper testState={testState} setTestState={setTestState} />);
    userEvent.type(screen.getByLabelText(/Username/i), "Fatcat");
    userEvent.type(screen.getByLabelText(/Password/i), "ILoveBDCC_2023");

    await act(async () => {
      console.error = jest.fn(); // Stummschaltung der Warnungen
      userEvent.click(screen.getByTestId("login-button"));
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.error.mockRestore(); // Wiederherstellen der Warnungen
    });

    expect(setTestState).toHaveBeenCalledWith(true);
  });
});
