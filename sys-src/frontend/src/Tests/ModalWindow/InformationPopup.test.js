import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import InformationPopup from "../../ModalWindow/InformationPopup";

describe("InformationPopup.js tests", () => {

    let testopen = true
    let testHeaderText = "InformationPopupHeaderTextTest"
    let testText = "InformationPopupTextTest"

    afterEach(() => {
        cleanup();
    });

    test("header should be visible", () => {
        render(<InformationPopup open={testopen} headerText={testHeaderText} text={testText} />);
        const headerVisible = screen.queryByText(/InformationPopupHeaderTextTest/i);
        expect(headerVisible).toBeVisible();
    });

    test("text should be visible", () => {
        render(<InformationPopup open={testopen} headerText={testHeaderText} text={testText} />);
        const textVisible = screen.queryByText(/InformationPopupTextTest/i);
        expect(textVisible).toBeVisible();
    });

});