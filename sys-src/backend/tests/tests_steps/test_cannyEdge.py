import pytest
import numpy as np
from app.Pipeline.Steps.cannyEdge import CannyEdge
from app.exceptions import ImageProcessingError, WrongParameterError

def test_successfull_execution_one_channel_image(create_grayscale_image):
    parameters = [100, 200]

    cannyEdge = CannyEdge()
    result = cannyEdge(create_grayscale_image, parameters)

    assert result.shape == create_grayscale_image.shape

def test_successfull_execution_three_channel_image(create_rgb_image):
    parameters = [100, 200]

    cannyEdge = CannyEdge()
    result = cannyEdge(create_rgb_image, parameters)

    assert result.shape == (create_rgb_image.shape[0], create_rgb_image.shape[1])

def test_invalid_image_shape_should_raise_wrong_paramter_error():
    parameters = [100, 200] 

    with pytest.raises(WrongParameterError):
        cannyEdge = CannyEdge()
        cannyEdge(np.zeros(10), parameters) # Invalid image shape ((10))

def test_invalid_number_of_paramters_should_raise_wrong_paramter_error(create_grayscale_image):
    parameters = [1]  # Invalid number of paramters (1)

    with pytest.raises(WrongParameterError):
        cannyEdge = CannyEdge()
        cannyEdge(create_grayscale_image, parameters)

def test_invalid_image_dtype_should_raise_image_processing_error():
    img = np.zeros((10, 10), dtype=np.float16) # Invalid dtype
    parameters = [100, 200] 

    with pytest.raises(ImageProcessingError):
        cannyEdge = CannyEdge()
        cannyEdge(img, parameters)