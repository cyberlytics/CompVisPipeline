import pytest
import numpy as np
from app.Pipeline.Steps.thresholdMultiOtsu import ThresholdMultiOtsu

from app.exceptions import ImageProcessingError, WrongParameterError



def test_invalid_image_shape():
    step = ThresholdMultiOtsu()
    img = np.array([1, 2, 3])  # Invalid shape
    parameters = [2]
    with pytest.raises(WrongParameterError):
        step(img, parameters)

def test_invalid_regions_parameter():
    step = ThresholdMultiOtsu()
    img = np.array([[1, 2, 3], [4, 5, 6]])
    parameters = [0]  # Invalid regions parameter
    with pytest.raises(WrongParameterError):
        step(img, parameters)

def test_invalid_image_grayscale():
    step = ThresholdMultiOtsu()
    img = np.array([[[1, 2, 3], [4, 5, 6]]])  # Color image
    parameters = [2]
    with pytest.raises(WrongParameterError):
        step(img, parameters)

def test_valid_threshold_calculation():
    step = ThresholdMultiOtsu()
    img = np.array([[1, 2, 3], [4, 5, 6]])
    parameters = [2]
    result = step(img, parameters)
    assert result.shape == img.shape
