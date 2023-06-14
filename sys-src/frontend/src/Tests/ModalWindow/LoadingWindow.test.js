import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingWindow from '../../ModalWindow/LoadingWindow';

describe('LoadingWindow.js test', () => {

    test('should render the loading window when open prop is true', () => {
            render(<LoadingWindow open={true} onClose={jest.fn()}/>);
        
            const loadingTitle = screen.getByTestId('loading-screen-title');
            const loadingCat = screen.getByTestId('loading-screen-cat');
        
            expect(loadingTitle).toBeInTheDocument();
            expect(loadingCat).toBeInTheDocument();
          });
        
          test('should not render the loading window when open prop is false', () => {
            render(<LoadingWindow open={false} onClose={jest.fn()}/>);
        
            const loadingTitle = screen.queryByTestId('loading-screen-title');
            const loadingCat = screen.queryByTestId('loading-screen-cat');
        
            expect(loadingTitle).not.toBeInTheDocument();
            expect(loadingCat).not.toBeInTheDocument();
          });
});