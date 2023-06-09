import pytest
import numpy as np
from app.Pipeline.Steps.poissonNoise import PoissonNoise
from app.exceptions import WrongParameterError


def test_poisson_noise_with_expected_result():
    image = np.random.randint(0, 255, (10, 10))

    poisson_noise_step = PoissonNoise()

    params = []
    result = poisson_noise_step(image, params)

    assert (image != result).any()


def test_poisson_noise_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, 1)

        poisson_noise_step = PoissonNoise()

        params = []
        poisson_noise_step(image, params)


def test_poisson_noise_with_rgb_image():
    image = np.random.randint(0, 255, (10, 10, 3))

    poisson_noise_step = PoissonNoise()

    params = []
    result = poisson_noise_step(image, params)

    assert (image != result).any()
