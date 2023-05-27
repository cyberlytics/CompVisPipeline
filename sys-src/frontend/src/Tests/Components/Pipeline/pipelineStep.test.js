import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PipelineStep from "../../../Components/Pipeline/pipelineStep";

describe("pipelineStep.js tests", () => {

    test("pipelineStep title visible", () => {
        let title = "pipelineStepTestTitle"
        let params = [{title: "title1", defaultValue: 1}, {title: "title2", defaultValue: 2}]
        render(<DndProvider backend={HTML5Backend}><PipelineStep title={title} params={params}/></DndProvider>);
        const stepTitleVisible = screen.queryByText(/pipelineStepTestTitle/i);
        expect(stepTitleVisible).toBeVisible();
      });

});