// Import necessary dependencies and setup

import { toast } from 'your-toast-library'; // Replace 'your-toast-library' with the actual library you're using
import { sendPipelineSteps } from './your-file'; // Replace './your-file' with the actual path to the file containing the function

jest.mock('your-fetch-library'); // Replace 'your-fetch-library' with the actual library you're using for fetch

// Create a test suite or test case
describe('sendPipelineSteps', () => {
    // Test the successful case where the response is OK
    test('should handle successful pipeline completion', async () => {
        // Mock the fetch function to return a successful response
        const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({ result: 'success' }) };
        jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

        const props = {
            originalImageID: 'your-image-id',
            steps: 'your-steps',
            setPipelineResult: jest.fn(),
        };

        // Call the function
        await sendPipelineSteps(props);

        // Assert that the expected actions have been called
        expect(props.setPipelineResult).toHaveBeenCalledWith({ result: 'success' });
        expect(toast.success).toHaveBeenCalledWith('Pipeline completed successfully.');
    });

    // Test the case where the response is not OK and an error response is received
    test('should handle unsuccessful pipeline completion with error response', async () => {
        // Mock the fetch function to return an unsuccessful response
        const mockResponse = { ok: false, json: jest.fn().mockResolvedValue({ error: 'Your error message' }) };
        jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

        const props = {
            originalImageID: 'your-image-id',
            steps: 'your-steps',
            setPipelineResult: jest.fn(),
        };

        // Call the function
        await sendPipelineSteps(props);

        // Assert that the expected actions have been called
        expect(props.setPipelineResult).toHaveBeenCalledWith([]);
        expect(toast.error).toHaveBeenCalledWith('Your error message');
    });

    // Test the case where the response is not OK and an error occurs while processing the response JSON
    test('should handle unsuccessful pipeline completion with error processing response', async () => {
        // Mock the fetch function to return an unsuccessful response
        const mockResponse = { ok: false, json: jest.fn().mockRejectedValue(new Error('Error processing JSON')) };
        jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

        const props = {
            originalImageID: 'your-image-id',
            steps: 'your-steps',
            setPipelineResult: jest.fn(),
        };

        // Call the function
        await sendPipelineSteps(props);

        // Assert that the expected actions have been called
        expect(props.setPipelineResult).toHaveBeenCalledWith([]);
        expect(toast.error).toHaveBeenCalledWith('Failed to process image: Unknown error occurred.');
    });

    // Test the case where an error occurs during the fetch request
    test('should handle error during fetch request', async () => {
        // Mock the fetch function to throw an error
        jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Fetch error'));

        const props = {
            originalImageID: 'your-image-id',
            steps: 'your-steps',
            setPipelineResult: jest.fn(),
        };

        // Call the function
        await sendPipelineSteps(props);

        // Assert that the expected actions have been called
        expect(props.setPipelineResult).toHaveBeenCalledWith([]);
        expect(toast.error).toHaveBeenCalledWith('An error occurred while communicating with the server.');
    });

    // Test the case where the fetch request is aborted
    test('should handle aborted fetch request', async () => {
        // Mock the fetch function to throw an AbortError
        jest.spyOn(global, 'fetch').mockRejectedValue({ name: 'AbortError' });

        const props = {
            originalImageID: 'your-image-id',
            steps: 'your-steps',
            setPipelineResult: jest.fn(),
        };

        // Call the function
        await sendPipelineSteps(props);

        // Assert that the expected actions have been called
        expect(props.setPipelineResult).toHaveBeenCalledWith([]);
        expect(toast.error).toHaveBeenCalledWith('Fetch start-pipeline aborted.');
    });
});
