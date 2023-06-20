import pytest
import numpy as np
from app.Pipeline.Steps.closing import Closing
from app.exceptions import ImageProcessingError, WrongParameterError


def test_successfull_execution_one_channel_image():
    img = np.zeros((10, 10), dtype=np.uint8)
    parameters = [0, 3, 3, 1]

    closing = Closing()
    result = closing(img, parameters)

    assert result.shape == (10, 10)


def test_successfull_execution_three_channel_image():
    img = np.zeros((10, 10, 3), dtype=np.uint8)
    parameters = [0, 3, 3, 1]

    closing = Closing()
    result = closing(img, parameters)

    assert result.shape == (10, 10, 3)


def test_invalid_kernel_shape_should_raise_wrong_paramter_error():
    img = np.zeros((10, 10), dtype=np.uint8)
    parameters = [3, 3, 3, 1]  # Invalid kernel shape (3)

    with pytest.raises(WrongParameterError):
        closing = Closing()
        closing(img, parameters)

def test_invalid_kernel_width_should_raise_wrong_paramter_error():
    img = np.zeros((10, 10), dtype=np.uint8)
    parameters = [0, 1, 3, 1]  # Invalid kernel width (1)

    with pytest.raises(WrongParameterError):
        closing = Closing()
        closing(img, parameters)

def test_invalid_kernel_height_should_raise_wrong_paramter_error():
    img = np.zeros((10, 10), dtype=np.uint8)
    parameters = [0, 3, 1, 1]  # Invalid kernel height (1)

    with pytest.raises(WrongParameterError):
        closing = Closing()
        closing(img, parameters)

def test_invalid_iterations_should_raise_wrong_paramter_error():
    img = np.zeros((10, 10), dtype=np.uint8)
    parameters = [0, 3, 3, 0]  # Invalid number of iterations (0)

    with pytest.raises(WrongParameterError):
        closing = Closing()
        closing(img, parameters)

def test_invalid_image_dtype_should_raise_image_processing_error():
    img = np.zeros((10, 10), dtype=np.float16) # Invalid dtype
    parameters = [0, 3, 3, 1]  

    with pytest.raises(ImageProcessingError):
        closing = Closing()
        closing(img, parameters)

