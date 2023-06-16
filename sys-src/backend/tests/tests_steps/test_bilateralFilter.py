import cv2
import numpy as np
import pytest
from app.Pipeline.Steps.bilateralFilter import BilateralFilter

from app.exceptions import ImageProcessingError, WrongParameterError


def test_invalid_image_shape():
    step = BilateralFilter()
    img = np.array([1, 2, 3], dtype=np.uint8)  # Invalid shape
    parameters = [5, 10, 10]
    with pytest.raises(WrongParameterError):
        step(img, parameters)

def test_invalid_diameter_parameter():
    step = BilateralFilter()
    img = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.uint8)
    parameters = [0, 10, 10]  # Invalid diameter parameter
    with pytest.raises(WrongParameterError):
        step(img, parameters)

def test_valid_bilateral_filter(mocker):
    step = BilateralFilter()
    img = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.uint8)
    parameters = [5, 10, 10]
    mocker.patch("app.Pipeline.Steps.bilateralFilter.cv2.bilateralFilter", lambda x, p0, p1, p2: x) # Patch cv2.bilateralFilter to return the input image
    result = step(img, parameters)
    assert np.array_equal(result, img)  # Result should be equal to the input image

def test_unexpected_exception(mocker):
    step = BilateralFilter()
    img = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.uint8)
    parameters = [5, 10, 10]
    # Simulate an unexpected exception
    mocker.patch("app.Pipeline.Steps.bilateralFilter.cv2.bilateralFilter", None)
    with pytest.raises(ImageProcessingError):
        step(img, parameters)