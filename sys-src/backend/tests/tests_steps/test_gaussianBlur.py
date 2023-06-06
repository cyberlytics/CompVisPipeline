import pytest
import numpy as np
from app.Pipeline.Steps.gaussianBlur import GaussianBlur
from app.exceptions import ImageProcessingError

def test_gaussian_blur_with_expected_result():
    image = np.random.randint(0, 255, (10, 10))

    gaussian_blur_step = GaussianBlur()

    params = [3, 3, 0, 0]
    result = gaussian_blur_step(image, params)

    assert (image != result).any()

def test_gaussian_blur_with_invalid_kernel_width():
    with pytest.raises(ImageProcessingError):
        image = np.random.randint(0, 255, (10, 10))

        gaussian_blur_step = GaussianBlur()

        params = [-1, 3, 0, 0]
        gaussian_blur_step(image, params)

def test_gaussian_blur_with_invalid_kernel_height():
    with pytest.raises(ImageProcessingError):
        image = np.random.randint(0, 255, (10, 10))

        gaussian_blur_step = GaussianBlur()

        params = [3, -1, 0, 0]
        gaussian_blur_step(image, params)

def test_gaussian_blur_with_even_kernel_width():
    with pytest.raises(ImageProcessingError):
        image = np.random.randint(0, 255, (10, 10))

        gaussian_blur_step = GaussianBlur()

        params = [2, 3, 0, 0]
        gaussian_blur_step(image, params)

def test_gaussian_blur_with_even_kernel_height():
    with pytest.raises(ImageProcessingError):
        image = np.random.randint(0, 255, (10, 10))

        gaussian_blur_step = GaussianBlur()

        params = [3, 2, 0, 0]
        gaussian_blur_step(image, params)

def test_gaussian_blur_with_invalid_image_shape():
    with pytest.raises(ImageProcessingError):
        image = np.random.randint(0, 255, 1)

        gaussian_blur_step = GaussianBlur()

        params = [3, 3, 0, 0]
        gaussian_blur_step(image, params)

def test_gaussian_blur_with_invalid_parameter_type():
    with pytest.raises(ImageProcessingError):
        image = np.random.randint(0, 255, 1)

        gaussian_blur_step = GaussianBlur()

        params = ["invalid", 3, 0, 0]
        gaussian_blur_step(image, params)

def test_gaussian_blur_with_rgb_image():
    image = np.random.randint(0, 255, (10, 10, 3))

    gaussian_blur_step = GaussianBlur()

    params = [3, 3, 0, 0]
    result = gaussian_blur_step(image, params)

    assert (image != result).any()