import React from 'react';
import { render, screen, cleanup, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AvailablePipelineSteps from '../../../Components/AvailableSteps/availablePipelineSteps';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Controller from '../../../controller';

describe("availablePipelineSteps.js tests", () => {

  afterEach(() => {
    cleanup();
  });

  test("card should be visible", () => {
    render(<DndProvider backend={HTML5Backend}><AvailablePipelineSteps /></DndProvider>);
    const cardVisible = screen.queryByText(/Available Steps/i);
    expect(cardVisible).toBeVisible();
  });

  test("searchBar should be visible", () => {
    const pipelineSteps = render(<DndProvider backend={HTML5Backend}><AvailablePipelineSteps /></DndProvider>);
    const textField = pipelineSteps.container.getElementsByClassName("SearchBar-TextField")
    expect(textField).toBeInTheDocument
  });

  test("should render all AvailableStep components", () => {

    const mockAvailablePipelineSteps = [
      { title: "Step 1", params: [], info: "", id: 1 },
      { title: "Step 2", params: [], info: "", id: 2 },
      { title: "Step 3", params: [], info: "", id: 3 }
    ];

    let spy = jest.spyOn(Controller, 'getPipelineStepsFromBackend');
    spy.mockImplementation((setAvailablePipelineSteps) => {
      setAvailablePipelineSteps(mockAvailablePipelineSteps);
    });

    render(<DndProvider backend={HTML5Backend}><AvailablePipelineSteps /></DndProvider>);

    expect(screen.queryByText(/Step 1/i)).toBeVisible();
    expect(screen.queryByText(/Step 2/i)).toBeVisible();
    expect(screen.queryByText(/Step 3/i)).toBeVisible();
  });

  test("should change searchbar input", () => {
    const mockAvailablePipelineSteps = [
      { title: "Step 1", params: [], info: "", id: 1 },
      { title: "Step 2", params: [], info: "", id: 2 },
      { title: "Step 3", params: [], info: "", id: 3 }
    ];

    let spy = jest.spyOn(Controller, 'getPipelineStepsFromBackend');
    spy.mockImplementation((setAvailablePipelineSteps) => {
      setAvailablePipelineSteps(mockAvailablePipelineSteps);
    });

    render(<DndProvider backend={HTML5Backend}><AvailablePipelineSteps /></DndProvider>);

    const searchQuery = "Step 2";

    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/Search.../i), { target: { value: searchQuery } });
    });

    //Searchbar should have text
    expect(screen.queryByText(/Search.../i)).toBeNull();
  });

});