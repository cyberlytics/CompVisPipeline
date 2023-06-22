import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import LoadingWindow from '../../ModalWindow/LoadingWindow';
import { act } from "react-dom/test-utils";

describe('LoadingWindow.js test', () => {

  afterEach(cleanup);

  test('should render the loading window when open prop is true', () => {
    render(<LoadingWindow open={true} onClose={jest.fn()} />);

    const loadingTitle = screen.getByTestId('loading-screen-title');
    const loadingCat = screen.getByTestId('loading-screen-cat');

    expect(loadingTitle).toBeInTheDocument();
    expect(loadingCat).toBeInTheDocument();
  });

  test('should not render the loading window when open prop is false', () => {
    render(<LoadingWindow open={false} onClose={jest.fn()} />);

    const loadingTitle = screen.queryByTestId('loading-screen-title');
    const loadingCat = screen.queryByTestId('loading-screen-cat');

    expect(loadingTitle).not.toBeInTheDocument();
    expect(loadingCat).not.toBeInTheDocument();
  });

  test('should call onClose when the close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<LoadingWindow open={true} onClose={onCloseMock} />);

    const closeButton = screen.getByTestId('loading-screen-abort');
    closeButton.click();

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('should clear the interval when the window is closed', () => {
    const clearIntervalMock = jest.spyOn(window, 'clearInterval');
    const { rerender } = render(<LoadingWindow open={true} onClose={jest.fn()} />);
  
    rerender(<LoadingWindow open={false} onClose={jest.fn()} />);
  
    expect(clearIntervalMock).toBeCalled()
  });

  test('should update cat position during the interval', () => {
    jest.useFakeTimers();
    render(<LoadingWindow open={true} onClose={jest.fn()} />);
  
    const loadingCat = screen.getByTestId('loading-screen-cat');
    const { left, top } = loadingCat.getBoundingClientRect();
  
    act(() => {
      jest.advanceTimersByTime(10);
    });

    const { updatedLeft, updatedTop } = loadingCat.getBoundingClientRect();

    expect(updatedLeft).not.toBe(left);
    expect(updatedTop).not.toBe(top);
  
    jest.useRealTimers();
  });

});