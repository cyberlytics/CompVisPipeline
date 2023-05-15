import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Parameter from "../../../Components/PipelineSteps/parameter";

describe("parameter.js tests", () => {
    test("parametername visible", () => {
        let title = "Parametertestname"
        let value = 123
        render(<Parameter parameterName={title} defaultValue={value}/>);
        const parameterNameVisible = screen.queryByText(/Parametertestname/i);
        expect(parameterNameVisible).toBeVisible();
      });
});