import numpy as np
from app.Pipeline.Steps.dilation import Dilation
import pytest
from app.exceptions import ImageProcessingError, WrongParameterError


def test_dilation_step_with_expected_result():
    image = np.array(
        [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ],
        dtype=np.uint8,
    )

    expected_result = np.array(
        [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
        ],
        dtype=np.uint8,
    )

    params = [0, 3, 3, 1]
    dilation_step = Dilation()
    result = dilation_step(image, params)
    assert np.array_equal(result, expected_result)


def test_dilation_step_with_unexpected_result():
    image = np.array(
        [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ],
        dtype=np.uint8,
    )

    not_expected_result = np.array(
        [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
        ],
        dtype=np.uint8,
    )

    params = [0, 3, 3, 1]
    dilation_step = Dilation()
    result = dilation_step(image, params)
    assert not np.array_equal(result, not_expected_result)


def test_dilation_step_with_invalid_shape():
    with pytest.raises(WrongParameterError):
        image = np.array(
            [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
            ],
            dtype=np.uint8,
        )

        params = [42, 3, 3, 1]
        dilation_step = Dilation()
        dilation_step(image, params)


def test_dilation_step_with_invalid_kernelwidth():
    with pytest.raises(WrongParameterError):
        image = np.array(
            [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
            ],
            dtype=np.uint8,
        )

        params = [0, -42, 3, 1]
        dilation_step = Dilation()
        dilation_step(image, params)


def test_dilation_step_with_invalid_kernelheighth():
    with pytest.raises(WrongParameterError):
        image = np.array(
            [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
            ],
            dtype=np.uint8,
        )

        params = [0, 3, -42, 1]
        dilation_step = Dilation()
        dilation_step(image, params)


def test_dilation_step_with_invalid_iterations():
    with pytest.raises(WrongParameterError):
        image = np.array(
            [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
            ],
            dtype=np.uint8,
        )

        params = [0, 3, 3, -42]
        dilation_step = Dilation()
        dilation_step(image, params)


def test_dilation_step_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        # Invalid image shape
        image = np.zeros((5, 5, 4, 4), dtype=np.uint8)

        params = [0, 3, 3, 1]
        dilation_step = Dilation()
        dilation_step(image, params)
        

def test_dilation_step_with_image_processing_error():
    with pytest.raises(ImageProcessingError):
        #Image with float 16 to get processing error
        image = np.zeros((5, 5), dtype=np.float16) 

        params = [0, 3, 3, 1]
        dilation_step = Dilation()
        dilation_step(image, params)


def test_dilation_step_with_value_error():
    with pytest.raises(WrongParameterError):
        image = np.array(
            [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
            ],
            dtype=np.uint8,
        )

        params = ['should', 'raise', 'ValueError', 'WrongParameterError']
        dilation_step = Dilation()
        dilation_step(image, params)