import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

describe("App.js tests", () => {

    afterEach(() => {
        cleanup();
    });

    test("CssBaseline should be in document", () => {
        const app = render(<App />);
        const cssBaseline = app.container.getElementsByClassName("App-CssBaseline")
        expect(cssBaseline).toBeInTheDocument
    });

    test("DndProvider should be in document", () => {
        const app = render(<App />);
        const dndProvider = app.container.getElementsByClassName("App-DndProvider")
        expect(dndProvider).toBeInTheDocument
    });

});