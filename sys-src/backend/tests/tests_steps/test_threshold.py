import pytest
import numpy as np

from app.Pipeline.Steps.threshold import Thershold
from app.exceptions import ImageProcessingError, WrongParameterError

def test_threshold_with_expected_result():
    image = np.array([
        [15, 14, 145, 14, 13],
        [15, 14, 142, 14, 13],
        [132, 145, 145, 145, 143],
        [15, 14, 141, 14, 13],
        [15, 14, 120, 14, 13]
    ]).astype("uint8")

    expected_result = np.array([
        [0, 0, 255, 0, 0],
        [0, 0, 255, 0, 0],
        [255, 255, 255, 255, 255],
        [0, 0, 255, 0, 0],
        [0, 0, 255, 0, 0]
    ])

    threshold_step = Thershold()

    params = [100, False]
    result = threshold_step(image, params)

    assert (result == expected_result).all()

def test_threshold_with_invert_result():
    image = np.array([
        [15, 14, 145, 14, 13],
        [15, 14, 142, 14, 13],
        [132, 145, 145, 145, 143],
        [15, 14, 141, 14, 13],
        [15, 14, 120, 14, 13]
    ]).astype("uint8")

    expected_result = np.array([
        [255, 255, 0, 255, 255],
        [255, 255, 0, 255, 255],
        [0, 0, 0, 0, 0],
        [255, 255, 0, 255, 255],
        [255, 255, 0, 255, 255]
    ])

    threshold_step = Thershold()

    params = [100, True]
    result = threshold_step(image, params)

    assert (result == expected_result).all()

def test_thershold_with_invalid_thresh_value():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10, 3)).astype("uint8")

        threshold_step = Thershold()

        params = [-20, False]
        threshold_step(image, params)

def test_threshold_with_invalid_parameter_type():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10, 3)).astype("uint8")

        threshold_step = Thershold()

        params = [100, "invalid"]
        threshold_step(image, params)

def test_threshold_with_invalid_thresh_value_type():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10, 3)).astype("uint8")

        threshold_step = Thershold()

        params = ["invalid", False]
        threshold_step(image, params)

def test_threshold_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, 1)

        threshold_step = Thershold()

        params = [100, False]
        threshold_step(image, params)

def test_threshold_with_invalid_image_type():
    with pytest.raises(ImageProcessingError):
        image = np.random.randint(0, 255, (10, 10, 3))

        threshold_step = Thershold()

        params = [100, False]
        threshold_step(image, params)

def test_threshold_with_rgb_image():
    image = np.array([
        [[16, 15, 89], [16, 15, 89], [100, 215, 13], [12, 55, 81], [12, 12, 19]],
        [[161, 150, 9], [1, 11, 89], [114, 205, 131], [1, 5, 8], [92, 15, 9]],
        [[123, 155, 181], [126, 154, 189], [150, 215, 131], [112, 255, 181], [122, 122, 159]],
        [[1, 115, 83], [6, 115, 39], [180, 115, 113], [122, 65, 81], [62, 92, 99]],
        [[11, 32, 55], [61, 11, 32], [200, 145, 113], [5, 5, 8], [123, 55, 67]]
    ]).astype("uint8")

    expected_result = np.array([
        [[0, 0, 0], [0, 0, 0], [0, 255, 0], [0, 0, 0], [0, 0, 0]],
        [[255, 255, 0], [0, 0, 0], [255, 255, 255], [0, 0, 0], [0, 0, 0]],
        [[255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255]],
        [[0, 255, 0], [0, 255, 0], [255, 255, 255], [255, 0, 0], [0, 0, 0]],
        [[0, 0, 0], [0, 0, 0], [255, 255, 255], [0, 0, 0], [255, 0, 0]]
    ])

    threshold_step = Thershold()

    params = [100, False]
    result = threshold_step(image, params)

    assert (result == expected_result).all()

def test_threshold_with_rgb_image_invert_result():
    image = np.array([
        [[16, 15, 89], [16, 15, 89], [100, 215, 13], [12, 55, 81], [12, 12, 19]],
        [[161, 150, 9], [1, 11, 89], [114, 205, 131], [1, 5, 8], [92, 15, 9]],
        [[123, 155, 181], [126, 154, 189], [150, 215, 131], [112, 255, 181], [122, 122, 159]],
        [[1, 115, 83], [6, 115, 39], [180, 115, 113], [122, 65, 81], [62, 92, 99]],
        [[11, 32, 55], [61, 11, 32], [200, 145, 113], [5, 5, 8], [123, 55, 67]]
    ]).astype("uint8")

    expected_result = np.array([
        [[255, 255, 255], [255, 255, 255], [255, 0, 255], [255, 255, 255], [255, 255, 255]],
        [[0, 0, 255], [255, 255, 255], [0, 0, 0], [255, 255, 255], [255, 255, 255]],
        [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[255, 0, 255], [255, 0, 255], [0, 0, 0], [0, 255, 255], [255, 255, 255]],
        [[255, 255, 255], [255, 255, 255], [0, 0, 0], [255, 255, 255], [0, 255, 255]]
    ])

    threshold_step = Thershold()

    params = [100, True]
    result = threshold_step(image, params)

    assert (result == expected_result).all()