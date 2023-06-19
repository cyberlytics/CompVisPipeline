import cv2
import numpy as np
import pytest
from app.Pipeline.Steps.thresholdOtsu import ThresholdOtsu
from app.exceptions import WrongParameterError, ImageProcessingError


def test_invalid_image_shape():
    step = ThresholdOtsu()
    img = np.array([1, 2, 3], dtype=np.uint8)  # Invalid shape
    parameters = [True]
    with pytest.raises(WrongParameterError):
        step(img, parameters)

def test_invalid_invert_flag():
    step = ThresholdOtsu()
    img = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.uint8)
    parameters = ["2"]  # Invalid invert flag
    with pytest.raises(WrongParameterError):
        step(img, parameters)

def test_valid_threshold_calculation():
    step = ThresholdOtsu()
    img = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.uint8)
    parameters = [True]
    result = step(img, parameters)
    assert result.shape == img.shape
    assert np.unique(result).tolist() == [0, 255]  # Result should only contain 0 and 255

def test_invert_flag_true(mocker):
    step = ThresholdOtsu()
    img = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.uint8)
    parameters = [True]
    mocker.patch("app.Pipeline.Steps.thresholdOtsu.cv2.THRESH_OTSU", 0)
    result = step(img, parameters)
    assert np.array_equal(result, np.zeros_like(img))  # All values should be 0

def test_invert_flag_false(mocker):
    step = ThresholdOtsu()
    img = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.uint8)
    parameters = [False]
    mocker.patch("app.Pipeline.Steps.thresholdOtsu.cv2.THRESH_OTSU", 0)
    result = step(img, parameters)
    assert np.array_equal(result, np.ones_like(img) * 255)  # All values should be 255

def test_unexpected_exception(mocker):
    step = ThresholdOtsu()
    img = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.uint8)
    parameters = [True]
    # Simulate an unexpected exception
    mocker.patch("app.Pipeline.Steps.thresholdOtsu.cv2.threshold", None)
    with pytest.raises(ImageProcessingError):
        step(img, parameters)