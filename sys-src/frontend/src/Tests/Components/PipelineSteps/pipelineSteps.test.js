import React from 'react'
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PipelineSteps from "../../../Components/PipelineSteps/pipelineSteps";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

describe("pipelineSteps.js tests", () => {

  afterEach(() => {
    cleanup();
  });

  test("card should be visible", () => {
    render(<DndProvider backend={HTML5Backend}><PipelineSteps /></DndProvider>);
    const cardVisible = screen.queryByText(/Available Steps/i);
    expect(cardVisible).toBeVisible();
  });

  test("searchBar should be visible", () => {
    const pipelineSteps = render(<DndProvider backend={HTML5Backend}><PipelineSteps /></DndProvider>);
    const textField = pipelineSteps.container.getElementsByClassName("SearchBar-TextField")
    expect(textField).toBeInTheDocument
  });

});