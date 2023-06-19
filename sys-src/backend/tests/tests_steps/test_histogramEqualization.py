import pytest
from app.Pipeline.Steps.histogramEqualization import HistogramEqualization
from app.exceptions import ImageProcessingError, WrongParameterError


def test_histogram_equalization_with_gray_scale_image(create_grayscale_image):
    step = HistogramEqualization()
    result = step(create_grayscale_image, [])
    assert result is not None
    assert len(result.shape) == 2
    assert result.shape == create_grayscale_image.shape

def test_histogram_equalization_with_rbg_scale_image_raises_wrong_parameter_error(create_rgb_image):
    step = HistogramEqualization()
    with pytest.raises(WrongParameterError):
        step(create_rgb_image,[])

def test_histogram_equalization_raises_image_processing_error():
    step = HistogramEqualization()
    with pytest.raises(ImageProcessingError):
        step(None, [])
    