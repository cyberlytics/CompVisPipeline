import pytest
import numpy as np
from app.Pipeline.Steps.speckleNoise import SpeckleNoise
from app.exceptions import WrongParameterError


def test_speckle_noise_with_expected_result():
    image = np.random.randint(0, 255, (10, 10)).astype("uint8")

    speckle_noise_step = SpeckleNoise()

    params = [1]
    result = speckle_noise_step(image, params)

    assert (image != result).any()
    assert result.dtype == image.dtype


def test_speckle_noise_with_invalid_strength():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10))

        speckle_noise_step = SpeckleNoise()

        params = [-11]
        speckle_noise_step(image, params)


def test_speckle_noise_with_zero_strength():
    image = np.random.randint(0, 255, (10, 10)).astype("uint8")

    speckle_noise_step = SpeckleNoise()

    params = [0]
    result = speckle_noise_step(image, params)

    assert (image == result).all()

def test_speckle_noise_with_invalid_parameter_type():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10))

        speckle_noise_step = SpeckleNoise()

        params = ["invalid"]
        speckle_noise_step(image, params)

def test_speckle_noise_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, 1)

        speckle_noise_step = SpeckleNoise()

        params = [1]
        speckle_noise_step(image, params)

def test_speckle_noise_with_rgb_image():
    image = np.random.randint(0, 255, (10, 10, 3)).astype("uint8")

    speckle_noise_step = SpeckleNoise()

    params = [1]
    result = speckle_noise_step(image, params)

    assert (image != result).any()
