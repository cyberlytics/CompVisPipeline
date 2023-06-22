import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PipelineStep from "../../../Components/Pipeline/pipelineStep";
import { act } from "react-dom/test-utils";

describe("pipelineStep.js tests", () => {

  afterEach(cleanup);

  test("pipelineStep title visible", () => {
    let title = "pipelineStepTestTitle"
    let params = [{ title: "title1", defaultValue: 1, value: 1 }, { title: "title2", defaultValue: 2, value: 2 }]
    render(<DndProvider backend={HTML5Backend}><PipelineStep title={title} params={params} /></DndProvider>);
    const stepTitleVisible = screen.queryByText(/pipelineStepTestTitle/i);
    expect(stepTitleVisible).toBeVisible();
  });

  test("pipelineStep expands parameters on button click and renders parameter correctly", () => {
    let title = "pipelineStepTestTitle";
    let params = [{ title: "title1", defaultValue: 1, value: 1 }, { title: "title2", defaultValue: 2, value: 2 }]

    render(<DndProvider backend={HTML5Backend}><PipelineStep title={title} params={params} /></DndProvider>);

    const parameterShouldBeNull = screen.queryByText(/title1/i);
    expect(parameterShouldBeNull).toBeNull(); //check if not visible when button not clicked.

    const expandButton = screen.getByTestId("expand-button");
    act(() => {
      fireEvent.click(expandButton); // Click on the expand button
    });

    const parameterShouldBeVisible = screen.queryByText(/title1/i);
    expect(parameterShouldBeVisible).toBeVisible(); //check if visible when button is clicked.
  });

  test("pipelineStep handles info button click", () => {
    let title = "pipelineStepTestTitle"
    let info = "testInfo"
    let params = [{ title: "title1", defaultValue: 1, value: 1 }, { title: "title2", defaultValue: 2, value: 2 }]

    render(<DndProvider backend={HTML5Backend}><PipelineStep title={title} params={params} info={info} /></DndProvider>);

    const informationPopupBeforeClick = screen.queryByText(/testInfo/i);
    expect(informationPopupBeforeClick).toBeNull();

    const infoButton = screen.getByTestId("info-button");
    act(() => {
      fireEvent.click(infoButton); // Click on the info button
    });

    const informationPopupAfterClick = screen.queryByText(/testInfo/i);
    expect(informationPopupAfterClick).toBeVisible();
  });

  test("pipelineStep handles show result button click", () => {
    const setCurrentImageIDMock = jest.fn();
    const setCurrentHistogramIDandMetadataMock = jest.fn();
    let title = "pipelineStepTestTitle"
    let params = [{ title: "title1", defaultValue: 1, value: 1 }, { title: "title2", defaultValue: 2, value: 2 }]
    const pipelineResult = { length: 3, result: [{ imageId: "image1" }, { imageId: "image2" }, { imageId: "image3" }] };
    render(<DndProvider backend={HTML5Backend}><PipelineStep title={title} params={params} stepIndex={0} pipelineResult={pipelineResult} setCurrentImageID={setCurrentImageIDMock} setCurrentHistogramIDandMetadata={setCurrentHistogramIDandMetadataMock} /></DndProvider>);

    const showResultButton = screen.getByTestId("showresult-button");
    act(() => {
      fireEvent.click(showResultButton); // Click on the showResult button
    });

    expect(setCurrentImageIDMock).toHaveBeenCalledWith("image2");
    expect(setCurrentHistogramIDandMetadataMock).toHaveBeenCalledWith({ imageId: "image2" });
  });

  test("pipelineStep handles delete step button click", () => {
    const deleteStep = jest.fn();
    let title = "pipelineStepTestTitle"
    let params = [{ title: "title1", defaultValue: 1, value: 1 }, { title: "title2", defaultValue: 2, value: 2 }]
    render(<DndProvider backend={HTML5Backend}><PipelineStep title={title} params={params} deleteStep={deleteStep} /></DndProvider>);

    const deleteStepButton = screen.getByTestId("deletestep-button");
    act(() => {
      fireEvent.click(deleteStepButton); //Click on the delete button
    });

    expect(deleteStep).toHaveBeenCalledTimes(1);
  });
  
  test("pipelineStep handles step reordering correctly", () => {
    const setPipelineResult = jest.fn();
    const setCurrentImageIDMock = jest.fn();
    const setCurrentHistogramIDandMetadataMock = jest.fn();
    const moveStepMock = jest.fn();
    const stepIndex = 0;
    const sourceUuid = "source-uuid";
    const targetUuid = "target-uuid";
    let params = [{ title: "title1", defaultValue: 1, value: 1 }, { title: "title2", defaultValue: 2, value: 2 }]
    let result = { result: [{ imageId: 'example-image-id' }] }
    
    // Render the source component
    render(<DndProvider backend={HTML5Backend}><PipelineStep title="Source Step" params={params} pipelineResult={result} uuid={sourceUuid} stepIndex={stepIndex} setCurrentImageID={setCurrentImageIDMock} setCurrentHistogramIDandMetadata={setCurrentHistogramIDandMetadataMock} setPipelineResult={setPipelineResult} moveStep={moveStepMock} /></DndProvider>);
    
    // Render the target component
    render(<DndProvider backend={HTML5Backend}><PipelineStep title="Target Step" params={params} pipelineResult={result} uuid={targetUuid} stepIndex={stepIndex + 1} setCurrentImageID={setCurrentImageIDMock} setCurrentHistogramIDandMetadata={setCurrentHistogramIDandMetadataMock} setPipelineResult={setPipelineResult} moveStep={moveStepMock} /></DndProvider>);
    
    const sourceComponent = screen.getByTestId(`pipeline-step-${sourceUuid}`);
    const targetComponent = screen.getByTestId(`pipeline-step-${targetUuid}`);    
    
    act(() => {
      fireEvent.dragStart(sourceComponent); // Simulate starting drag on the source component
    });
    
    act(() => {
      fireEvent.dragEnter(targetComponent); // Simulate dragging into the target component
    });
    
    act(() => {
      fireEvent.dragOver(targetComponent); // Simulate dragging over the target component
    });
    
    act(() => {
      fireEvent.drop(targetComponent); // Simulate dropping onto the target component
    });
    
    expect(moveStepMock).toHaveBeenCalledTimes(1);
    expect(moveStepMock).toHaveBeenCalledWith(stepIndex, stepIndex+1); // Check if the moveStep function is called with the correct arguments
  });

});