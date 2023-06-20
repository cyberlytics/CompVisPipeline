import pytest
from app.Pipeline.Steps.topHat import TopHat
from app.exceptions import ImageProcessingError, WrongParameterError


def test_tophat_with_valid_params(create_grayscale_image):
    step = TopHat()
    parameters = ["0", "3", "3", "1"]
    result = step(create_grayscale_image, parameters)
    assert result.shape == create_grayscale_image.shape

def test_tophat_raises_WrongParameterError_for_rgbImage(create_rgb_image):
    step = TopHat()
    parameters = ["0", "3", "3", "1"]
    with pytest.raises(WrongParameterError):
        step(create_rgb_image, parameters)

def test_tophat_raises_WrongParameterError_for_invalid_kernel_shape(create_grayscale_image):
    step = TopHat()
    parameters = ["42", "3", "3", "1"]
    with pytest.raises(WrongParameterError):
        step(create_grayscale_image, parameters)

def test_tophat_raises_WrongParameterError_for_invalid_kernel_width(create_grayscale_image):
    step = TopHat()
    parameters = ["0", "-3", "3", "1"]
    with pytest.raises(WrongParameterError):
        step(create_grayscale_image, parameters)


def test_tophat_raises_WrongParameterError_for_invalid_kernel_height(create_grayscale_image):
    step = TopHat()
    parameters = ["0", "3", "-3", "1"]
    with pytest.raises(WrongParameterError):
       step(create_grayscale_image, parameters)

def test_tophat_raises_WrongParameterError_for_invalid_number_of_iterations(create_grayscale_image):
    step = TopHat()
    parameters = ["0", "3", "3", "0"]
    with pytest.raises(WrongParameterError):
        step(create_grayscale_image, parameters)

def test_tophat_raises_ImageProcessingError():
    step = TopHat()
    parameters = ["0", "3", "3", "22"]
    with pytest.raises(ImageProcessingError):
        step(None, parameters)