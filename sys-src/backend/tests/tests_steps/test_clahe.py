import numpy as np
import pytest

from app.Pipeline.Steps.clahe import CLAHE
from app.exceptions import WrongParameterError, ImageProcessingError


def test_clahe_with_valid_parameters(create_grayscale_image):
    step = CLAHE()
    parameters = ["2", "8", "8"]  # Gültige Parameter
    result = step(create_grayscale_image, parameters)
    assert result is not None
    assert len(result.shape) == 2
    assert result.shape == create_grayscale_image.shape

def test_clahe_with_invalid_image_shape():
    step = CLAHE()
    parameters = ["2", "8", "8"]
    invalid_image = np.array([[[0, 0, 0], [0, 0, 0]]], dtype=np.uint8)  # Ungültige Bildform (Farbbild)
    with pytest.raises(WrongParameterError):
        step(invalid_image, parameters)

def test_clahe_with_negative_clip_limit(create_grayscale_image):
    step = CLAHE()
    parameters = ["-2", "8", "8"]  # Ungültiger Clip-Grenzwert
    with pytest.raises(WrongParameterError):
        step(create_grayscale_image, parameters)

def test_clahe_with_negative_grid_width(create_grayscale_image):
    step = CLAHE()
    parameters = ["2", "-8", "8"]  # Ungültige Gitterbreite
    with pytest.raises(WrongParameterError):
        step(create_grayscale_image, parameters)

def test_clahe_with_negative_grid_height(create_grayscale_image):
    step = CLAHE()
    parameters = ["2", "8", "-8"]  # Ungültige Gitterhöhe
    with pytest.raises(WrongParameterError):
        step(create_grayscale_image, parameters)


def test_clahe_with_image_processing_error():
    step = CLAHE()
    parameters = ["2", "8", "8"]
    # Führe CLAHE mit einem ungültigen Bild (None) aus
    with pytest.raises(ImageProcessingError):
        step(None, parameters)