import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AvailableStep from "../../../Components/AvailableSteps/availableStep";

describe("availableStep.js tests", () => {

    test("availableStep title visible", () => {
        let title = "AvailableStepTestTitle"
        let params = [{title: "title1", defaultValue: 1}, {title: "title2", defaultValue: 2}]
        render(<DndProvider backend={HTML5Backend}><AvailableStep title={title} params={params}/></DndProvider>);
        const stepTitleVisible = screen.queryByText(/AvailableStepTestTitle/i);
        expect(stepTitleVisible).toBeVisible();
      });

});