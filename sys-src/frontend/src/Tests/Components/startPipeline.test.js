import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StartPipeline from "../../Components/startPipeline";

describe("startPipeline.js tests", () => {

  test("card should be visible", () => {
    render(<StartPipeline />);
    const cardVisible = screen.queryByText(/Start Pipeline/i);
    expect(cardVisible).toBeVisible();
  });

    test('button is disabled when originalImageID is null', () => {
      const props = {
        originalImageID: null,
      };

      const { getByText } = render(<StartPipeline {...props} />);

      const button = getByText('Start Pipeline');

      expect(button).toBeDisabled();

    });

  test('button is clickable when originalImageID is not null', () => {
    const props = {
      originalImageID: 'example-image-id',
    };

    const { getByText } = render(<StartPipeline {...props} />);

    const button = getByText('Start Pipeline');

    expect(button).not.toBeDisabled();
  });
});