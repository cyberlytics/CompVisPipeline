import Controller from "../controller";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

describe("controller.js tests", () => {
  let originalAbortController;

  beforeAll(() => {
    originalAbortController = window.AbortController;
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(window, "AbortController").mockImplementation(() => ({
      abort: jest.fn(),
      signal: {
        aborted: false,
        addEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
        onabort: null,
        removeEventListener: jest.fn(),
      },
    }));
    global.fetch = jest.fn();
    global.fetch.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    window.AbortController = originalAbortController;
  });

  test("login should return true for successful login", async () => {
    const mockResponse = {
      status: 200,
    };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await Controller.login("username", "password");

    expect(global.fetch).toHaveBeenCalledWith("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "username",
        password: "password",
      }),
      signal: expect.objectContaining({
        aborted: false,
      }),
    });
    expect(result).toBe(true);
  });

  test("login should return false for failed login", async () => {
    const mockResponse = {
      status: 400,
    };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await Controller.login("username", "password");

    expect(global.fetch).toHaveBeenCalledWith("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "username",
        password: "password",
      }),
      signal: expect.objectContaining({
        aborted: false,
      }),
    });
    expect(result).toBe(false);
  });

  test("login should return false when error", async () => {
    const mockError = new Error("Request failed");
    global.fetch.mockRejectedValueOnce(mockError);

    const result = await Controller.login("username", "password");

    expect(result).toBe(false);
  });

  test("getPipelineStepsFromBackend should fetch available steps and call set function", async () => {
    const mockResponse = {
      step1: "Step 1",
      step2: "Step 2",
    };
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const setMock = jest.fn();

    await Controller.getPipelineStepsFromBackend(setMock);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/available-steps",
      expect.objectContaining({
        signal: expect.anything(),
      })
    );

    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for the fetch promise to resolve

    expect(setMock).toHaveBeenCalledWith(mockResponse);
  });

  test("getPipelineStepsFromBackend should not set result when fetch is aborted", async () => {
    const mockResponse = {
      name: 'AbortError'
    };
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const setMock = jest.fn();

    const originalAbortController = window.AbortController;
    window.AbortController = jest.fn(() => ({
      signal: 'AbortSignal',
      abort: jest.fn(),
    }));

    global.fetch.mockRejectedValueOnce(mockResponse);
    await Controller.getPipelineStepsFromBackend(setMock);
    expect(setMock).not.toHaveBeenCalled();
    window.AbortController = originalAbortController;
  });

  test("getPipelineStepsFromBackend should not set result", async () => {
    const setMock = jest.fn();
    global.fetch.mockRejectedValueOnce(new Error('Some error occurred.'));
    await Controller.getPipelineStepsFromBackend(setMock);
    expect(setMock).not.toHaveBeenCalled();
  });

  test("sendPipelineSteps should send pipeline steps and set result on success", async () => {
    const props = {
      originalImageID: "image123",
      steps: [
        {
          title: "Bilateral Filter",
          params: [
            { defaultValue: 3, info: "Info 1", title: "Title 1", value: 3 },
            { defaultValue: 0.02, info: "Info 2", title: "Title 2", value: 0.02 },
          ],
          info: "Info",
          id: 0,
          uuid: "uuid1",
        },
        {
          title: "Gaussian Blur",
          params: [
            { defaultValue: 5, info: "Info 3", title: "Title 3", value: 5 },
            { defaultValue: 0, info: "Info 4", title: "Title 4", value: 0 },
          ],
          info: "Info",
          id: 1,
          uuid: "uuid2",
        },
      ],
      setPipelineResult: jest.fn(),
    };

    const mockResponse = {
      result: "Pipeline completed successfully",
    };

    const mockTransformedJSON = [
      { id: 0, params: [3, 0.02] },
      { id: 1, params: [5, 0] },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const toastSuccessSpy = jest.spyOn(toast, "success");

    await Controller.sendPipelineSteps(props);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/start-pipeline/image123",
      expect.objectContaining({
        signal: Controller.abortController.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockTransformedJSON),
      })
    );

    expect(props.setPipelineResult).toHaveBeenCalledWith(mockResponse);
    expect(toastSuccessSpy).toHaveBeenCalledWith("Pipeline completed successfully.");
  });

  test("sendPipelineSteps should handle error response", async () => {
    const props = {
      originalImageID: "image123",
      steps: [
        {
          title: "Bilateral Filter",
          params: [
            { defaultValue: 3, info: "Info 1", title: "Title 1", value: 3 },
            { defaultValue: 0.02, info: "Info 2", title: "Title 2", value: 0.02 },
          ],
          info: "Info",
          id: 0,
          uuid: "uuid1",
        },
        {
          title: "Gaussian Blur",
          params: [
            { defaultValue: 5, info: "Info 3", title: "Title 3", value: 5 },
            { defaultValue: 0, info: "Info 4", title: "Title 4", value: 0 },
          ],
          info: "Info",
          id: 1,
          uuid: "uuid2",
        },
      ],
      setPipelineResult: jest.fn(),
    };

    const mockErrorResponse = {
      error: "Invalid pipeline steps",
    };

    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
    });

    await Controller.sendPipelineSteps(props);

    expect(props.setPipelineResult).toHaveBeenCalledWith([]);
  });

  test("sendPipelineSteps should handle abort response", async () => {
    const props = {
      originalImageID: "image123",
      steps: [
        {
          title: "Bilateral Filter",
          params: [
            { defaultValue: 3, info: "Info 1", title: "Title 1", value: 3 },
            { defaultValue: 0.02, info: "Info 2", title: "Title 2", value: 0.02 },
          ],
          info: "Info",
          id: 0,
          uuid: "uuid1",
        },
        {
          title: "Gaussian Blur",
          params: [
            { defaultValue: 5, info: "Info 3", title: "Title 3", value: 5 },
            { defaultValue: 0, info: "Info 4", title: "Title 4", value: 0 },
          ],
          info: "Info",
          id: 1,
          uuid: "uuid2",
        },
      ],
      setPipelineResult: jest.fn(),
    };

    const originalAbortController = window.AbortController;
    const abortController = new AbortController();
    window.AbortController = jest.fn(() => abortController);

    const abortError = new Error("AbortError");
    abortError.name = "AbortError";

    global.fetch.mockImplementationOnce(() => {
      abortController.abort();
      return delay();
    });

    await Controller.sendPipelineSteps(props);

    expect(props.setPipelineResult).toHaveBeenCalledWith([]);

    window.AbortController = originalAbortController;
  });

  test("getImageMetadataFromBackend should fetch image metadata and call setMetadata function", async () => {
    const imageId = "image123";
    const setMetadataMock = jest.fn();

    const mockResponse = {
      histId: "1234",
      height: "400",
      width: "300",
      channels: "3",
    };

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const toastErrorSpy = jest.spyOn(toast, "error");

    await Controller.getImageMetadataFromBackend(imageId, setMetadataMock);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/image-metadata/image123",
      expect.objectContaining({
        signal: Controller.abortController.signal,
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(setMetadataMock).toHaveBeenCalledWith(mockResponse);
    expect(toastErrorSpy).not.toHaveBeenCalled();
  });
  
  test('abortFetch should abort the fetch and create a new AbortController', () => {
    const mockAbortControllerConstructor = jest.fn();

    global.AbortController = jest.fn();
    global.AbortController.mockImplementationOnce(mockAbortControllerConstructor);

    Controller.abortFetch();

    expect(mockAbortControllerConstructor).toHaveBeenCalledTimes(1);
  });

  test("getAiImageFromBackend should fetch an image and call setAiImage function", async () => {
    const setOriginalImageIDMock = jest.fn();
    const setCurrentImageIDMock = jest.fn();
    const setMetadataMock = jest.fn();
    const mockResponse = {
      imageId: 0,
      histId: 1,
      height: 100,
      width: 100,
      channels: 3
    }

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const toastErrorSpy = jest.spyOn(toast, "error");

    await Controller.getAiImageFromBackend(setOriginalImageIDMock, setCurrentImageIDMock, setMetadataMock);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/random-ai-fatcat",
      expect.objectContaining({
        signal: Controller.abortController.signal,
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 0)); // Warten, bis der Fetch-Aufruf abgeschlossen ist

    expect(setMetadataMock).toHaveBeenCalledWith(mockResponse);
    expect(toastErrorSpy).not.toHaveBeenCalled();
  });

  test("getAiImageFromBackend should handle fetch abort error", async () => {
    const setOriginalImageIDMock = jest.fn();
    const setCurrentImageIDMock = jest.fn();
    const setMetadataMock = jest.fn();
  
    global.fetch.mockRejectedValueOnce(new Error('AbortError'));
  
    await Controller.getAiImageFromBackend(
      setOriginalImageIDMock,
      setCurrentImageIDMock,
      setMetadataMock
    );
  
    expect(setMetadataMock).not.toHaveBeenCalled();
  });
  
});