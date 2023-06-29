import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pipeline from "../../../Components/Pipeline/pipeline";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { act } from "react-dom/test-utils";

describe("pipeline.js tests", () => {

  afterEach(cleanup);

  test("card should be visible", () => {
    const testSteps = []
    const testPipelineResult = []
    render(<DndProvider backend={HTML5Backend}><Pipeline steps={testSteps} pipelineResult={testPipelineResult} /></DndProvider>);
    const cardVisible = screen.queryByText(/Pipeline/i);
    expect(cardVisible).toBeVisible();
  });

  test("uploaded picture step should be visible", () => {
    const testSteps = []
    const testPipelineResult = []
    const pipeline = render(<DndProvider backend={HTML5Backend}><Pipeline steps={testSteps} pipelineResult={testPipelineResult} /></DndProvider>);
    expect(pipeline.container.getElementsByClassName("step-uploadedPicture")).toHaveLength(1);
  });

  test("pipelineStep handles show result button click", () => {
    const setPipelineResult = jest.fn();
    const setCurrentImageIDMock = jest.fn();
    const setCurrentHistogramIDandMetadataMock = jest.fn();
    const testSteps = []
    const params = [{ title: "title1", defaultValue: 1, value: 1 }, { title: "title2", defaultValue: 2, value: 2 }]
    const pipelineResult = { length: 3, result: [{ imageId: "image1" }, { imageId: "image2" }, { imageId: "image3" }] };

    render(
      <DndProvider backend={HTML5Backend}>
        <Pipeline
          steps={testSteps}
          pipelineResult={pipelineResult}
          params={params}
          setCurrentImageID={setCurrentImageIDMock}
          setCurrentHistogramIDandMetadata={setCurrentHistogramIDandMetadataMock}
          setPipelineResult={setPipelineResult} />
      </DndProvider>
    );

    const showResultButton = screen.getByTestId("showuploadedpicture-button");
    act(() => {
      fireEvent.click(showResultButton); // Click on the showResult button
    });

    expect(setCurrentImageIDMock).toHaveBeenCalledWith("image1");
    expect(setCurrentHistogramIDandMetadataMock).toHaveBeenCalledWith({ imageId: "image1" });
  });

  test("should delete a step when delete button is clicked", () => {
    const setStepsMock = jest.fn();
    const setPipelineResult = jest.fn();
    const setCurrentImageIDMock = jest.fn();
    const setCurrentHistogramIDandMetadataMock = jest.fn();
    const params = [{ title: "title1", defaultValue: 1, value: 1 }, { title: "title2", defaultValue: 2, value: 2 }]
    const testSteps = [{ uuid: "step1", params: params }];
    const testPipelineResult = [];

    render(
      <DndProvider backend={HTML5Backend}>
        <Pipeline
          steps={testSteps}
          pipelineResult={testPipelineResult}
          params={params}
          setSteps={setStepsMock}
          setCurrentImageID={setCurrentImageIDMock}
          setCurrentHistogramIDandMetadata={setCurrentHistogramIDandMetadataMock}
          setPipelineResult={setPipelineResult} />
      </DndProvider>
    );

    const deleteButton = screen.getByTestId("deletestep-button");
    act(() => {
      fireEvent.click(deleteButton);
    });

    expect(setStepsMock).toHaveBeenCalledWith(expect.not.arrayContaining([{ uuid: "step1" }]));
  });

  test("should show uploaded picture when the show button is clicked", () => {
    const setCurrentImageIDMock = jest.fn();
    const setCurrentHistogramIDandMetadataMock = jest.fn();
    const setPipelineResult = jest.fn();
    const testSteps = [];
    const testPipelineResult = { length: 3, result: [{ imageId: "image1" }, { imageId: "image2" }, { imageId: "image3" }] };

    render(
      <DndProvider backend={HTML5Backend}>
        <Pipeline
          steps={testSteps}
          pipelineResult={testPipelineResult}
          setCurrentImageID={setCurrentImageIDMock}
          setCurrentHistogramIDandMetadata={setCurrentHistogramIDandMetadataMock}
          setPipelineResult={setPipelineResult} />
      </DndProvider>
    );

    const showUploadedPictureButton = screen.getByTestId("showuploadedpicture-button");
    act(() => {
      fireEvent.click(showUploadedPictureButton);
    });

    expect(setCurrentImageIDMock).toHaveBeenCalledWith("image1");
    expect(setCurrentHistogramIDandMetadataMock).toHaveBeenCalledWith({ imageId: "image1" });
  });

});
