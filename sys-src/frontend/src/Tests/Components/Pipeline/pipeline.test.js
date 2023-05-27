import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pipeline from "../../../Components/Pipeline/pipeline";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

describe("pipeline.js tests", () => {

  test("card should be visible", () => {
    render(<DndProvider backend={HTML5Backend}><Pipeline /></DndProvider>);
    const cardVisible = screen.queryByText(/Pipeline/i);
    expect(cardVisible).toBeVisible();
  });

  test("initial step should be visible", () => {
    render(<DndProvider backend={HTML5Backend}><Pipeline /></DndProvider>);
    const initialStepVisible = screen.queryByText(/Uploaded Picture/i);
    expect(initialStepVisible).toBeVisible();
  });

});