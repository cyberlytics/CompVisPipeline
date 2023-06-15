import pytest
import numpy as np

from app.Pipeline.Steps.gammaTransform import GammaTransform
from app.exceptions import ImageProcessingError, WrongParameterError

def test_gamma_transform_with_expected_result():
    image = np.array([
        [10, 20, 30],
        [40, 50, 60],
        [70, 80, 90]
    ]).astype("uint8")

    expected_result = np.array([
        [61, 86, 105],
        [121, 135, 148],
        [160, 171, 182]
    ])

    gamma_transform_step = GammaTransform()

    params = [0.5, 1.2]
    result = gamma_transform_step(image, params)

    assert np.array_equal(result, expected_result)

def test_gamma_transform_with_invalid_gamma_value():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10)).astype("uint8")
        
        gamma_transform_step = GammaTransform()

        params = [-0.5, 1.2]
        gamma_transform_step(image, params)

def test_gamma_transform_with_invalid_parameter_type():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10)).astype("uint8")

        gamma_transform_step = GammaTransform()

        params = ["invalid", 1.2]
        gamma_transform_step(image, params)

def test_gamma_transform_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, 1).astype("uint8")

        gamma_transform_step = GammaTransform()

        params = [0.5, 1.2]
        gamma_transform_step(image, params)


def test_gamma_transform_with_invalid_image_type():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, 1).astype(np.float32)

        gamma_transform_step = GammaTransform()

        params = [0.5, 1.2]
        gamma_transform_step(image, params)


def test_gamma_transform_with_processing_error():
    with pytest.raises(ImageProcessingError):
        gamma_transform_step = GammaTransform()

        params = [0.5, 1.2]
        gamma_transform_step(None, params)