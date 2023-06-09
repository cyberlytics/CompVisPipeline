import pytest
import numpy as np

from app.Pipeline.Steps.rotate import Rotate
from app.exceptions import WrongParameterError

def test_rotate_with_expected_result_90_degrees():
    image = np.array([
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ])

    excepted_result = np.array([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ])

    rotate_step = Rotate()
    params = [0]
    result = rotate_step(image, params)

    assert (result == excepted_result).all()

def test_rotate_with_expected_result_180_degrees():
    image = np.array([
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ])

    expected_result = np.array([
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ])

    rotate_step = Rotate()
    params = [1]
    result = rotate_step(image, params)

    assert (result == expected_result).all()

def test_rotate_with_expected_result_270_degrees():
    image = np.array([
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ])

    expected_result = np.array([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ])

    rotate_step = Rotate()
    params = [2]
    result = rotate_step(image, params)

    assert (result == expected_result).all()

def test_rotate_with_invalid_rotation_parameter():
    with pytest.raises(WrongParameterError):
        image = np.array([
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ])

        rotate_step = Rotate()
        params = [3]

        rotate_step(image, params)

def test_rotate_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.array([0, 0, 1, 0, 0])

        rotate_step = Rotate()
        params = [0]

        rotate_step(image, params)

def test_rotate_with_invalid_parameter_type():
    with pytest.raises(WrongParameterError):
        image = np.array([
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ])

        rotate_step = Rotate()
        params = ["invalid"]

        rotate_step(image, params)

def test_rotate_with_expeceted_image_type():
    image = np.array([
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ]).astype("uint8")

    rotate_step = Rotate()
    params = [0]

    result = rotate_step(image, params)

    assert result.dtype == image.dtype

def test_rotate_with_rgb_image():
    image = np.random.randint(0, 255, (10, 10, 3))

    rotate_step = Rotate()

    params = [1]
    result = rotate_step(image, params)

    assert (image != result).any()