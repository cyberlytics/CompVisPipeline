import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import DeleteWindow from "../../ModalWindow/DeleteWindow";

describe("DeleteWindow.js tests", () => {
    test("DeleteWindow renders correctly if open is true", () => {
        render(<DeleteWindow open={true} />);
        expect(screen.getByTestId("deleteDialog")).toBeInTheDocument();
    });

    test("DeleteWindow does not appear if open is false", () => {
        render(<DeleteWindow open={false} />);
        expect(screen.queryByTestId("deleteDialog")).not.toBeInTheDocument();
    });

    test("DeleteWindow has a title and text", () => {
        render(<DeleteWindow open={true} dialogTitle="TestTitle" dialogText="TestText" />);
        expect(screen.getByTestId("deleteDialog-title")).toHaveTextContent("TestTitle");
        expect(screen.getByText("TestText")).toBeInTheDocument();
    });

    test("DeleteWindow has DELETE and CANCEL buttons", () => {
        render(<DeleteWindow open={false} />);
        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
        expect(screen.queryByText("Cancel")).not.toBeInTheDocument();

        render(<DeleteWindow open={true} />);
        expect(screen.getByText("Delete")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    test("DeleteWindow close with cancel button", () => {
        const onCloseMock = jest.fn();
        const open = true;

        render(<DeleteWindow open={open} onClose={onCloseMock} />);

        const cancelButton = screen.getByText("Cancel");

        act(() => {
            userEvent.click(cancelButton);
        });

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test("DeleteWindow call handle function", () => {
        const onCloseMock = jest.fn();
        const handleFunctionMock = jest.fn();
        const open = true;

        render(<DeleteWindow open={open} onClose={onCloseMock} handleFunction={handleFunctionMock} />);
        const deleteButton = screen.getByText("Delete");

        act(() => {
            userEvent.click(deleteButton);
        });

        expect(handleFunctionMock).toHaveBeenCalledTimes(1);
    });

});