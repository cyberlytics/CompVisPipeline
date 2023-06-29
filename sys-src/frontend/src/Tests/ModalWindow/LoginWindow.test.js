import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginWindow from "../../ModalWindow/LoginWindow";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Controller from "../../controller";


const TestWrapper = ({ testState, setTestState, testIsLoading, setTestIsLoading }) => {
  return (
    <LoginWindow open={true} onClose={() => {}} setState={setTestState} setIsLoading={setTestIsLoading}/>
  );
};

describe("LoginWindow.js tests", () => {
  let testState;
  let setTestState;
  let testIsLoading;
  let setTestIsLoading;

  beforeEach(() => {
    testState = false;
    setTestState = jest.fn();
    testIsLoading = false;
    setTestIsLoading = jest.fn();
    cleanup();
  });

  test("login window should be visible", () => {
    render(<TestWrapper testState={testState} setTestState={setTestState} testIsLoading={testIsLoading} setTestIsLoading={setTestIsLoading}/>);
    const loginVisible = screen.queryByText(/Login as developer/i);
    expect(loginVisible).toBeVisible();
  });

  test("login with false credentials should not change testState", async () => {
    render(<TestWrapper testState={testState} setTestState={setTestState} testIsLoading={testIsLoading} setTestIsLoading={setTestIsLoading}/>);

    Controller.login = jest.fn().mockResolvedValueOnce(false);

    await act(async () => {
      console.error = jest.fn(); // Stummschaltung der Warnungen
      userEvent.click(screen.getByTestId("login-button"));
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.error.mockRestore(); // Wiederherstellen der Warnungen
    });

    expect(testState).toBe(false);
  });

  test("login with correct credentials should set testState to true", async () => {
    render(<TestWrapper testState={testState} setTestState={setTestState} testIsLoading={testIsLoading} setTestIsLoading={setTestIsLoading} />);
    userEvent.type(screen.getByLabelText(/Username/i), "Fatcat");
    userEvent.type(screen.getByLabelText(/Password/i), "ILoveBDCC_2023");

    Controller.login = jest.fn().mockResolvedValueOnce(true);

    await act(async () => {
      console.error = jest.fn(); // Stummschaltung der Warnungen
      userEvent.click(screen.getByTestId("login-button"));
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.error.mockRestore(); // Wiederherstellen der Warnungen
    });

    expect(setTestState).toHaveBeenCalledWith(true);
  });

  test("login with false credentials should display error message", async () => {
    render(<TestWrapper testState={testState} setTestState={setTestState} testIsLoading={testIsLoading} setTestIsLoading={setTestIsLoading} />);
  
    Controller.login = jest.fn().mockResolvedValueOnce(false);
  
    await act(async () => {
      console.error = jest.fn(); // Stummschaltung der Warnungen
      userEvent.click(screen.getByTestId("login-button"));
      await new Promise((resolve) => setTimeout(resolve, 0));
      console.error.mockRestore(); // Wiederherstellen der Warnungen
    });
  
    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Incorrect Username or Password");
  });
});