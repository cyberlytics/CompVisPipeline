import { render, screen } from '@testing-library/react';
import App from "../../App";
import React from "react";
import "@testing-library/jest-dom/extend-expect";


describe('Minimize the windowsize', () => {
    const message = 'Maximize the window immediately!';
    test('displays content when window is smaller than 900px', () => {
        // Mock the window.innerWidth to be smaller than 900px
        global.innerWidth = 800;

        render(<App />);

        // Check if the content is displayed
        const contentElement = screen.getByText(message);
        expect(contentElement).toBeInTheDocument();
    });

    test('does not display content when window is larger than 900px', () => {
        // Mock the window.innerWidth to be larger than 900px
        global.innerWidth = 1460;

        render(<App />);

        // Check if the content is not displayed
        const contentElement = screen.queryByText(message);
        expect(contentElement).toBeNull();
    });
});
