import pytest
import numpy as np
from app.Pipeline.Steps.bottomHat import BottomHat
from app.exceptions import ImageProcessingError, WrongParameterError


def test_successfull_execution_one_channel_image(create_grayscale_image):
    parameters = [0, 3, 3, 1]

    bottomHat = BottomHat()
    result = bottomHat(create_grayscale_image, parameters)

    assert result.shape == create_grayscale_image.shape


def test_successfull_execution_three_channel_image(create_rgb_image):
    parameters = [0, 3, 3, 1]

    bottomHat = BottomHat()
    result = bottomHat(create_rgb_image, parameters)

    assert result.shape == create_rgb_image.shape

def test_successfull_execution_one_channel_image_kernel_one(create_grayscale_image):
    parameters = [1, 3, 3, 1]

    bottomHat = BottomHat()
    result = bottomHat(create_grayscale_image, parameters)

    assert result.shape == create_grayscale_image.shape

def test_successfull_execution_one_channel_image_kernel_two(create_grayscale_image):
    parameters = [2, 3, 3, 1]

    bottomHat = BottomHat()
    result = bottomHat(create_grayscale_image, parameters)

    assert result.shape == create_grayscale_image.shape


def test_invalid_kernel_shape_should_raise_wrong_paramter_error(create_grayscale_image):
    parameters = [3, 3, 3, 1]  # Invalid kernel shape (3)

    with pytest.raises(WrongParameterError):
        bottomHat = BottomHat()
        bottomHat(create_grayscale_image, parameters)

def test_invalid_kernel_width_should_raise_wrong_paramter_error(create_grayscale_image):
    parameters = [0, 1, 3, 1]  # Invalid kernel width (1)

    with pytest.raises(WrongParameterError):
        bottomHat = BottomHat()
        bottomHat(create_grayscale_image, parameters)

def test_invalid_kernel_height_should_raise_wrong_paramter_error(create_grayscale_image):
    parameters = [0, 3, 1, 1]  # Invalid kernel height (1)

    with pytest.raises(WrongParameterError):
        bottomHat = BottomHat()
        bottomHat(create_grayscale_image, parameters)

def test_invalid_iterations_should_raise_wrong_paramter_error(create_grayscale_image):
    parameters = [0, 3, 3, 0]  # Invalid number of iterations (0)

    with pytest.raises(WrongParameterError):
        bottomHat = BottomHat()
        bottomHat(create_grayscale_image, parameters)

def test_invalid_image_dtype_should_raise_image_processing_error():
    img = np.zeros((10, 10), dtype=np.float16) # Invalid dtype
    parameters = [0, 3, 3, 1]  

    with pytest.raises(ImageProcessingError):
        bottomHat = BottomHat()
        bottomHat(img, parameters)

