import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Parameter from "../../../Components/Pipeline/parameter";

describe("parameter.js tests", () => {

  test("parametername visible", () => {
    let title = "Parametertestname"
    let value = 123
    render(<Parameter parameterName={title} defaultValue={value} />);
    const parameterNameVisible = screen.queryByText(/Parametertestname/i);
    expect(parameterNameVisible).toBeVisible();
  });

  test("info should not be visible ", () => {
    let title = "Parametertestname"
    let value = 123
    let info = "testinfo"
    render(<Parameter parameterName={title} defaultValue={value} info={info} />);
    const beforeClick = screen.queryByText(/testinfo/i);
    expect(beforeClick).toBeNull()
  });

  test("parameter type number should be visible", () => {
    let title = "Parametertestname"
    let value = 123
    const parameter = render(<Parameter parameterName={title} defaultValue={value} />)
    expect(parameter.container.getElementsByClassName("parameter-type-number")).toHaveLength(1);
    expect(parameter.container.getElementsByClassName("parameter-type-text")).toHaveLength(0);
    expect(parameter.container.getElementsByClassName("parameter-type-boolean")).toHaveLength(0);
  });

  test("parameter type text should be visible", () => {
    let title = "Parametertestname"
    let value = "defaultValue"
    const parameter = render(<Parameter parameterName={title} defaultValue={value} />)
    expect(parameter.container.getElementsByClassName("parameter-type-number")).toHaveLength(0);
    expect(parameter.container.getElementsByClassName("parameter-type-text")).toHaveLength(1);
    expect(parameter.container.getElementsByClassName("parameter-type-boolean")).toHaveLength(0);
  });

  test("parameter type boolean should be visible", () => {
    let title = "Parametertestname"
    let value = false
    const parameter = render(<Parameter parameterName={title} defaultValue={value} />)
    expect(parameter.container.getElementsByClassName("parameter-type-number")).toHaveLength(0);
    expect(parameter.container.getElementsByClassName("parameter-type-text")).toHaveLength(0);
    expect(parameter.container.getElementsByClassName("parameter-type-boolean")).toHaveLength(1);
  });

  test("handleInfoClick should open the information popup", () => {
    let title = "Parametertestname";
    let value = 123;
    let info = "testinfo";
    render(<Parameter parameterName={title} defaultValue={value} info={info} />);
    const infoIcon = screen.getByTestId("info-button");
    fireEvent.click(infoIcon);
    const informationPopupTitle = screen.queryByText(/testinfo/i);
    expect(informationPopupTitle).toBeVisible();
  });

  test("handleDiscardChangesClick should set parameter value to default value", () => {
    let title = "Parametertestname";
    let defaultValue = 123;
    let value = 456;
    const setValueMock = jest.fn();
    render(<Parameter parameterName={title} defaultValue={defaultValue} value={value} setValue={setValueMock} />);
    const discardChangesButton = screen.getByTestId("discard-changes-button");
    fireEvent.click(discardChangesButton);
    expect(setValueMock).toHaveBeenCalledTimes(1);
    expect(setValueMock).toHaveBeenCalledWith(undefined, defaultValue); //check if called with defaultvalue
  });

});