import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import DefaultImageWindow from "../../ModalWindow/DefaultImageWindow";

describe("DefaultImageWindow.js tests", () => {
    test("DefaultImageWindow renders correctly if open is true", () => {
        render(<DefaultImageWindow open={true} />);
        expect(screen.getByTestId("defaultImageDialog")).toBeInTheDocument();
    });

    test("DefaultImageWindow does not appear if open is false", () => {
        render(<DefaultImageWindow open={false} />);
        expect(screen.queryByTestId("defaultImageDialog")).not.toBeInTheDocument();
    });

    test("DefaultImageWindow has title and text", () => {
        render(<DefaultImageWindow open={true} />);

        const title = screen.getByTestId("defaultImageDialog-title");
        expect(title).toBeInTheDocument();
    });

    test("DefaultImageWindow has default image and ai image buttons", () => {
        render(<DefaultImageWindow open={true} />);

        const defaultImageButton = screen.getByRole("button", { name: /default image/i })
        const aiImageButton = screen.getByRole("button", { name: /ai image/i })

        expect(defaultImageButton).toBeInTheDocument();
        expect(aiImageButton).toBeInTheDocument();
    });

    test("DefaultImageWindow close with cancel button", () => {
        const onCloseMock = jest.fn();
        
        render(<DefaultImageWindow open={true} onClose={onCloseMock} />);
        const cancelButton = screen.getByTestId("defaultImageWindow-abort");

        fireEvent.click(cancelButton);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test("DefaultImageWindow call handler functions", () => {
        const handleDefaultImageMock = jest.fn();
        const handleAIImageMock = jest.fn();
        const onCloseMock = jest.fn();
        render(<DefaultImageWindow open={true} onClose={onCloseMock} handleFunction1={handleDefaultImageMock} handleFunction2={handleAIImageMock} />);

        const defaultImageButton = screen.getByRole("button", { name: /default image/i })
        const aiImageButton = screen.getByRole("button", { name: /ai image/i })

        fireEvent.click(defaultImageButton);
        expect(handleDefaultImageMock).toHaveBeenCalledTimes(1);
        fireEvent.click(aiImageButton);
        expect(handleAIImageMock).toHaveBeenCalledTimes(1);

    });
});