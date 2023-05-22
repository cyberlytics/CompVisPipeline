import React, { useState as useStateMock } from 'react'
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PipelineSteps from "../../../Components/PipelineSteps/pipelineSteps";
import TestPipelineSteps from "../PipelineSteps/testPipelineSteps.json"
import Step from '../../../Components/PipelineSteps/step';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe("pipelineSteps.js tests", () => {
  const setState = jest.fn()

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState])
  })

  test("card should be visible", () => {
    render(<PipelineSteps />);
    const cardVisible = screen.queryByText(/Available Steps/i);
    expect(cardVisible).toBeVisible();
  });

});