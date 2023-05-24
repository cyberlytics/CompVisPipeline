import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Parameter from "../../../Components/PipelineSteps/parameter";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

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
    const parameter = shallow(<Parameter parameterName={title} defaultValue={value} info={info} />);
    const beforeClick = screen.queryByText(/testinfo/i);
    expect(beforeClick).toBeNull()
  });

});