import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pipeline from "../../../Components/Pipeline/pipeline";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

describe("pipeline.js tests", () => {

  const testSteps = []

  test("card should be visible", () => {
    render(<DndProvider backend={HTML5Backend}><Pipeline steps={testSteps}/></DndProvider>);
    const cardVisible = screen.queryByText(/Pipeline/i);
    expect(cardVisible).toBeVisible();
  });

  test("uploaded picture step should be visible", () => {
    const pipeline = render(<DndProvider backend={HTML5Backend}><Pipeline steps={testSteps} /></DndProvider>);
    expect(pipeline.container.getElementsByClassName("step-uploadedPicture")).toHaveLength(1);
  });

});