import pytest
import numpy as np
from app.Pipeline.Steps.saltAndPepperNoise import SaltAndPepperNoise

def test_salt_and_pepper_noise_with_expected_result():
    image = np.full((10, 10), 100)

    sNp_noise = SaltAndPepperNoise()

    params = [0.5, 0.05]
    result = sNp_noise(image, params)

    assert (image != result).any()
    assert (0 in np.unique(result))
    assert (255 in np.unique(result))

def test_salt_and_pepper_noise_with_negative_ratio():
    image = np.full((10, 10), 100)

    sNp_noise = SaltAndPepperNoise()

    params = [-1, 0.05]
    result = sNp_noise(image, params)

    assert (image != result).any()
    assert (0 in np.unique(result))
    assert (255 not in np.unique(result))

def test_salt_and_pepper_noise_with_too_big_ratio():
    image = np.full((10, 10), 100)

    sNp_noise = SaltAndPepperNoise()

    params = [2, 0.05]
    result = sNp_noise(image, params)

    assert (image != result).any()
    assert (0 not in np.unique(result))
    assert (255 in np.unique(result))

def test_salt_and_pepper_noise_with_invalid_strength():
    image = np.full((10, 10), 100)

    sNp_noise = SaltAndPepperNoise()

    params = [0.5, -1]
    result = sNp_noise(image, params)

    assert (image == result).all()

def test_salt_and_pepper_noise_with_rgb_image():
    image = np.random.randint(1, 254, (10, 10, 3))

    sNp_noise = SaltAndPepperNoise()

    params = [0.5, 0.05]
    result = sNp_noise(image, params)

    assert (image != result).any()
    assert (0 in np.unique(result))
    assert (255 in np.unique(result))

