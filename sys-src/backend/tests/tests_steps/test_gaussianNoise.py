import pytest
import numpy as np
from app.Pipeline.Steps.gaussianNoise import GaussianNoise, ImageProcessingError

def test_gaussian_noise_with_expected_result():
    image = np.random.randint(0, 255, (10, 10))

    gaussian_noise_step = GaussianNoise()

    params = [1]
    result = gaussian_noise_step(image, params)

    assert (image != result).any()

def test_gaussian_noise_with_invalid_strength():
    with pytest.raises(ImageProcessingError):
        image = np.random.randint(0, 255, (10, 10))

        gaussian_noise_step = GaussianNoise()

        params = [-11]
        gaussian_noise_step(image, params)

def test_gaussian_noise_with_zero_strength():
    image = np.random.randint(0, 255, (10, 10))

    gaussian_noise_step = GaussianNoise()

    params = [0]
    result = gaussian_noise_step(image, params)
    
    assert (image == result).all()

def test_gaussian_noise_with_rgb_image():
    image = np.random.randint(0, 255, (10, 10, 3))

    gaussian_noise_step = GaussianNoise()

    params = [1]
    result = gaussian_noise_step(image, params)
    
    assert (image != result).any()