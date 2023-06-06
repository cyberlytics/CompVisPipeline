import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import DeveloperMenu from "../../../Components/Header/developerMenu";
import S3Manager from "../../../Components/Connections/awsS3";

describe("developerMenu.js tests", () => {
    test("Display Developer Menu", () => {
        render(<DeveloperMenu />);
        expect(screen.getByTestId("deleteButton-icon")).toBeInTheDocument();
    });

    test("Display Dialog windows after click on delete button", async () => {
        render(<DeveloperMenu />);
        const button = screen.getByTestId("deleteButton-icon");
        
        act(() => {    
            userEvent.click(button);
        });

        const dialogWindow = screen.getByTestId("deleteDialog");
        const cancelButton = screen.getByText("Cancel");
        const deleteButton = screen.getByText("Delete");
    
        expect(dialogWindow).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    test("Close Dialog windows after click on cancel button", async () => {
        render(<DeveloperMenu />);

        const button = screen.getByTestId("deleteButton-icon");

        act(() => {
            userEvent.click(button);
        });

        const cancelButton = screen.getByText("Cancel");
        expect(cancelButton).toBeInTheDocument();

        expect(cancelButton).toBeInTheDocument();
        
        fireEvent.click(cancelButton);

        const dialog = screen.queryByRole("dialog");
        expect(dialog).not.toBeVisible();

    });
    
    test("Check if handler function is called after click on delete button", async () => {
        render(<DeveloperMenu />);

        const spy = jest.spyOn(S3Manager.prototype, "deleteAllImagesFromS3");
        spy.mockImplementation(() => Promise.resolve({}));

        const button = screen.getByTestId("deleteButton-icon");

        act(() => {
            userEvent.click(button);
        });

        const deleteButton = screen.getByText("Delete");
        expect(deleteButton).toBeInTheDocument();

        act(() => {
            fireEvent.click(deleteButton);
        });

        expect(spy).toHaveBeenCalled();

        const dialog = screen.queryByRole("dialog");
        expect(dialog).not.toBeVisible();
    });
});

