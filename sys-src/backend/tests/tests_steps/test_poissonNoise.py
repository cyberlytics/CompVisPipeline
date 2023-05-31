import pytest
import numpy as np
from app.Pipeline.Steps.poissonNoise import PoissonNoise

def test_poisson_noise_with_expected_result():
    image = np.random.randint(0, 255, (10, 10))

    poisson_noise_step = PoissonNoise()
    
    params = []
    result = poisson_noise_step(image, params)

    assert (image != result).any()

def test_poisson_noise_with_rgb_image():
    image = np.random.randint(0, 255, (10, 10, 3))

    poisson_noise_step = PoissonNoise()

    params = []
    result = poisson_noise_step(image, params)
    
    assert (image != result).any()