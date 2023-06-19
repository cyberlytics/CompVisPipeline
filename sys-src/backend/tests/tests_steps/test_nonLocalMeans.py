import pytest
from app.Pipeline.Steps.nonLocalMeansFilter import NonLocalMeansFilter
from app.exceptions import ImageProcessingError, WrongParameterError


def test_nonLocalMeans_with_rgb_image(create_rgb_image):
    step = NonLocalMeansFilter()
    parameter = ["3", "7", "21"]
    result = step(create_rgb_image, parameter)
    assert result.shape == create_rgb_image.shape


def test_nonLocalMeans_with_grayscale_image(create_grayscale_image):
    step = NonLocalMeansFilter()
    parameter = ["3", "7", "21"]
    result = step(create_grayscale_image, parameter)
    assert result.shape == create_grayscale_image.shape

def test_nonLocalMeans_raises_WrongParameterError_for_negative_filter_strength(create_rgb_image):
    step = NonLocalMeansFilter()
    parameter = ["-2", "7", "21"]
    with pytest.raises(WrongParameterError):
        step(create_rgb_image, parameter)

def test_nonLocalMeans_raises_WrongParameterError_for_negative_template_window_size(create_rgb_image):
    step = NonLocalMeansFilter()
    parameter = ["3", "-7", "21"]
    with pytest.raises(WrongParameterError):
        step(create_rgb_image, parameter)

def test_nonLocalMeans_raises_WrongParameterError_for_negative_search_window_size(create_rgb_image):
    step = NonLocalMeansFilter()
    parameter = ["3", "7", "-21"]
    with pytest.raises(WrongParameterError):
        step(create_rgb_image, parameter)

def test_nonLocalMeans_raises_ImageProcessingError():
    step = NonLocalMeansFilter()
    parameter = ["3", "7", "21"]
    with pytest.raises(ImageProcessingError):
        step(None, parameter)

def test_nonLocalMeans_works_with_even_window_sizes(create_rgb_image):
    step = NonLocalMeansFilter()
    parameter = ["2", "6", "6"]
    result = step(create_rgb_image, parameter)
    assert result.shape == create_rgb_image.shape
