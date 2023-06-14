import pytest
import numpy as np

from app.Pipeline.Steps.flip import Flip
from app.exceptions import ImageProcessingError, WrongParameterError

def test_flip_with_expected_result_vertical():
    image = np.array([
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ])

    expected_result = np.array([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ])

    flip_step = Flip()
    params = [0]
    result = flip_step(image, params)

    assert (result == expected_result).all()

def test_flip_with_expected_result_horizontal():
    image = np.array([
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1]
    ])

    expected_result = np.array([
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0]
    ])

    flip_step = Flip()
    params = [1]
    result = flip_step(image, params)

    assert (result == expected_result).all()


def test_flip_with_expected_result_both_directions():
    image = np.array([
        [1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ])

    expected_result = np.array([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1]
    ])

    flip_step = Flip()
    params = [-1]
    result = flip_step(image, params)

    assert (result == expected_result).all()

def test_flip_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.array([0, 0, 1, 0, 0])

        flip_step = Flip()
        params = [0]

        flip_step(image, params)

def test_flip_with_invalid_parameter_type():
    with pytest.raises(WrongParameterError):
        image = np.array([
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ])

        flip_step = Flip()
        params = ["invalid"]

        flip_step(image, params)

def test_flip_with_expected_image_type():
    image = np.array([
        [1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]).astype("uint8")

    flip_step = Flip()
    params = [-1]
    result = flip_step(image, params)

    assert result.dtype == image.dtype

def test_flip_with_rgb_image():
    image = np.random.randint(0, 255, (10, 10, 3))

    flip_step = Flip()

    params = [0]
    result = flip_step(image, params)

    assert (image != result).any()