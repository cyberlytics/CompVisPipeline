import pytest
import numpy as np
from app.Pipeline.Steps.saltAndPepperNoise import SaltAndPepperNoise
from app.exceptions import WrongParameterError


def test_salt_and_pepper_noise_with_expected_result():
    image = np.full((10, 10), 100)

    sNp_noise_step = SaltAndPepperNoise()

    params = [0.5, 0.05]
    result = sNp_noise_step(image, params)

    assert (image != result).any()
    assert 0 in np.unique(result)
    assert 255 in np.unique(result)


def test_salt_and_pepper_noise_with_negative_ratio():
    with pytest.raises(WrongParameterError):
        image = np.full((10, 10), 100)

        sNp_noise_step = SaltAndPepperNoise()

        params = [-1, 0.05]
        sNp_noise_step(image, params)


def test_salt_and_pepper_noise_with_too_big_ratio():
    with pytest.raises(WrongParameterError):
        image = np.full((10, 10), 100)

        sNp_noise_step = SaltAndPepperNoise()

        params = [2, 0.05]
        sNp_noise_step(image, params)


def test_salt_and_pepper_noise_with_invalid_strength():
    with pytest.raises(WrongParameterError):
        image = np.full((10, 10), 100)

        sNp_noise_step = SaltAndPepperNoise()

        params = [0.5, -1]
        sNp_noise_step(image, params)

def test_salt_and_pepper_noise_with_invalid_parameter_type():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10))

        sNp_noise_step = SaltAndPepperNoise()

        params = ["invalid", 0.05]
        sNp_noise_step(image, params)

def test_salt_and_pepper_noise_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, 1)

        sNp_noise_step = SaltAndPepperNoise()

        params = [0.5, 0.05]
        sNp_noise_step(image, params)


def test_salt_and_pepper_noise_with_rgb_image():
    image = np.random.randint(1, 254, (10, 10, 3))

    sNp_noise_step = SaltAndPepperNoise()

    params = [0.5, 0.05]
    result = sNp_noise_step(image, params)

    assert (image != result).any()
    assert 0 in np.unique(result)
    assert 255 in np.unique(result)
