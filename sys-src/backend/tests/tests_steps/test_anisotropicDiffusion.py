import pytest
import numpy as np

from app.Pipeline.Steps.anisotropicDiffusion import AnisotropicDiffusion
from app.exceptions import ImageProcessingError, WrongParameterError

def test_anisotropic_diffusion_with_expected_result():
    image = np.random.randint(0, 255, (10, 10, 3)).astype(np.uint8)

    anisotropic_diffusion_step = AnisotropicDiffusion()

    params = [0.5, 1, 1]
    result = anisotropic_diffusion_step(image, params)

    assert (result != image).any()

def test_anisotropic_diffusion_with_invalid_alpha_value():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10, 3)).astype(np.uint8)

        anisotropic_diffusion_step = AnisotropicDiffusion()

        params = [0, 1, 1]
        anisotropic_diffusion_step(image, params)

def test_anisotropic_diffusion_with_invalid_iterations():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10, 3)).astype(np.uint8)

        anisotropic_diffusion_step = AnisotropicDiffusion()

        params = [0.5, 1, 0]
        anisotropic_diffusion_step(image, params)

def test_anisotropic_diffusion_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10)).astype(np.uint8)

        anisotropic_diffusion_step = AnisotropicDiffusion()

        params = [0.5, 1, 1]
        anisotropic_diffusion_step(image, params)

def test_anisotropic_diffusion_with_invalid_image_type():
    with pytest.raises(ImageProcessingError):
        image = np.random.randint(0, 255, (10, 10, 3)).astype(np.float32)

        anisotropic_diffusion_step = AnisotropicDiffusion()

        params = [0.5, 1, 1]
        anisotropic_diffusion_step(image, params)
