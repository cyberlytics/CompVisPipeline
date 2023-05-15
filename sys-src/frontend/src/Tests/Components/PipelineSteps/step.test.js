import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Step from "../../../Components/PipelineSteps/step";

describe("parameter.js tests", () => {
    test("parametername visible", () => {
        let isClickable = true
        let title = "Steptesttitle"
        let id = 42
        let params = [{title: "title1", defaultValue: 1}, {title: "title2", defaultValue: 2}]
        render(<Step isClickable={isClickable} title={title} id={id} params={params}/>);
        const stepNameVisible = screen.queryByText(/Steptesttitle/i);
        expect(stepNameVisible).toBeVisible();
      });
});