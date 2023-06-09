import pytest
import numpy as np
from app.Pipeline.Steps.gaussianNoise import GaussianNoise
from app.exceptions import ImageProcessingError, WrongParameterError


def test_gaussian_noise_with_expected_result():
    image = np.random.randint(0, 255, (10, 10)).astype("uint8")

    gaussian_noise_step = GaussianNoise()

    params = [1]
    result = gaussian_noise_step(image, params)

    assert (image != result).any()


def test_gaussian_noise_with_invalid_strength():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10))

        gaussian_noise_step = GaussianNoise()

        params = [-11]
        gaussian_noise_step(image, params)


def test_gaussian_noise_with_zero_strength():
    image = np.random.randint(0, 255, (10, 10)).astype("uint8")

    gaussian_noise_step = GaussianNoise()

    params = [0]
    result = gaussian_noise_step(image, params)

    assert (image == result).all()


def test_gaussian_noise_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, 1)

        gaussian_noise_step = GaussianNoise()

        params = [1]
        gaussian_noise_step(image, params)

def test_gaussian_noise_with_invalid_parameter_type():
    with pytest.raises(WrongParameterError):
        image = image = np.random.randint(0, 255, (10, 10))

        gaussian_noise_step = GaussianNoise()

        params = ["invalid"]
        gaussian_noise_step(image, params)

def test_gaussian_noise_with_invalid_image_type():
    with pytest.raises(ImageProcessingError):
        image = np.random.randint(0, 255, (10, 10)).astype(np.float32)

        gaussian_noise_step = GaussianNoise()

        params = [1]
        gaussian_noise_step(image, params)

def test_gaussian_noise_with_rgb_image():
    image = np.random.randint(0, 255, (10, 10, 3)).astype("uint8")

    gaussian_noise_step = GaussianNoise()

    params = [1]
    result = gaussian_noise_step(image, params)

    assert (image != result).any()
