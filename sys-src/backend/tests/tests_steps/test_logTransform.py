import pytest
import numpy as np

from app.Pipeline.Steps.logTransform import LogTransform
from app.exceptions import ImageProcessingError, WrongParameterError

def test_log_transform_with_expected_result():
    image = np.array([
        [10, 20, 30],
        [40, 50, 60],
        [70, 80, 90]
    ]).astype("uint8")

    expected_result = np.array([
        [7, 13, 20],
        [26, 32, 38],
        [44, 50, 55]
    ])

    log_transform_step = LogTransform()

    params = [0.5, "False"]
    result = log_transform_step(image, params)

    assert np.array_equal(result, expected_result)

def test_log_transform_with_expected_result_inverted():
    image = np.array([
        [10, 20, 30],
        [40, 50, 60],
        [70, 80, 90]
    ]).astype("uint8")

    expected_result = np.array([
        [3, 7, 10],
        [14, 18, 22],
        [26, 30, 35]
    ])

    log_transform_step = LogTransform()

    params = [0.5, "True"]
    result = log_transform_step(image, params)

    assert np.array_equal(result, expected_result)

def test_log_transform_with_invalid_parameter_type():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10)).astype("uint8")
        
        log_transform_step = LogTransform()

        params = ["invalid", "False"]
        log_transform_step(image, params)

def test_log_transform_with_invalid_invert_flag():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10)).astype("uint8")
        
        log_transform_step = LogTransform()

        params = [0.5, "invalid"]
        log_transform_step(image, params)

def test_log_transform_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, 1).astype("uint8")

        log_transform_step = LogTransform()

        parameters = [0.5, "False"]
        log_transform_step(image, parameters)

def test_log_transform_with_invalid_image_type():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, 1).astype(np.float32)

        log_transform_step = LogTransform()

        parameters = [0.5, "False"]
        log_transform_step(image, parameters)

def test_log_transform_with_processing_error():
    with pytest.raises(ImageProcessingError):
        log_transform_step = LogTransform()

        params = [0.5, "False"]
        log_transform_step(None, params)