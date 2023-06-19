import numpy as np
from app.Pipeline.Steps.crop import Crop
import pytest
from app.exceptions import ImageProcessingError, WrongParameterError


def test_crop_step_with_expected_result():
    image = np.array(
        [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
        ],
        dtype=np.uint8,
    )

    expected_result = np.array(
        [
            [8, 9, 10],
            [13, 14, 15],
            [18, 19, 20],
        ],
        dtype=np.uint8,
    )

    params = [2, 1, 3, 3, False]
    crop_step = Crop()
    result = crop_step(image, params)
    assert np.array_equal(result, expected_result)


def test_crop_step_with_inverse():
    image = np.array(
        [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
        ],
        dtype=np.uint8,
    )

    expected_result = np.array(
        [
            [1, 2, 3, 4, 5],
            [6, 0, 0, 0, 10],
            [11, 0, 0, 0, 15],
            [16, 0, 0, 0, 20],
            [21, 22, 23, 24, 25],
        ],
        dtype=np.uint8,
    )

    params = [1, 1, 3, 3, True]
    crop_step = Crop()
    result = crop_step(image, params)
    assert np.array_equal(result, expected_result)


def test_crop_step_with_invalid_shape():
    with pytest.raises(WrongParameterError):
        image = np.array(
            [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 16],
                [17, 18, 19, 20],
            ],
            dtype=np.uint8,
        )

        params = [1, 1, 3, 3, False]
        crop_step = Crop()
        crop_step(image.reshape((2, 2, 5)), params)


def test_crop_step_with_negative_start_coordinates():
    with pytest.raises(WrongParameterError):
        image = np.array(
            [
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
                [11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25],
            ],
            dtype=np.uint8,
        )

        params = [-1, 1, 3, 3, False]
        crop_step = Crop()
        crop_step(image, params)


def test_crop_step_with_zero_distance():
    with pytest.raises(WrongParameterError):
        image = np.array(
            [
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
                [11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25],
            ],
            dtype=np.uint8,
        )

        params = [1, 1, 0, 3, False]
        crop_step = Crop()
        crop_step(image, params)


def test_crop_step_with_crop_exceeding_image_boundaries():
    with pytest.raises(WrongParameterError):
        image = np.array(
            [
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
                [11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25],
            ],
            dtype=np.uint8,
        )

        params = [3, 3, 3, 3, False]
        crop_step = Crop()
        crop_step(image, params)


def test_crop_step_with_value_error():
    with pytest.raises(WrongParameterError):
        image = np.array(
            [
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
                [11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25],
            ],
            dtype=np.uint8,
        )

        params = ['should', 'raise', 'ValueError', 'WrongParameterError']
        crop_step = Crop()
        crop_step(image, params)


def test_crop_step_with_image_processing_error():
    with pytest.raises(ImageProcessingError):
        image = None
        params = [1, 1, 3, 3, False]
        crop_step = Crop()
        crop_step(image, params)
