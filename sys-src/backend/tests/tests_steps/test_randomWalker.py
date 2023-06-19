import pytest
import numpy as np

from app.Pipeline.Steps.randomWalker import RandomWalker
from app.exceptions import ImageProcessingError, WrongParameterError

def test_random_walker_with_expected_result():
    image = np.zeros([15, 15]).astype("uint8")
    image[2:5, 5:11] = 120
    image[5:10, 9:14] = 170
    image[5:13, 2:5] = 220

    expected_result = np.array([
       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
       [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
       [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
       [1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1],
       [1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1],
       [1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1],
       [1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1],
       [1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1],
       [1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ])

    random_walker_step = RandomWalker()

    params = [150]
    result = random_walker_step(image, params)

    assert np.array_equal(result, expected_result)

def test_random_walker_with_zero_threshold():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (15, 15))

        random_walker_step = RandomWalker()

        params = [0]
        random_walker_step(image, params)

def test_random_walker_with_invalid_parameter():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (15, 15))

        random_walker_step = RandomWalker()

        params = [-100]
        random_walker_step(image, params)

def test_random_walker_with_invalid_parameter_type():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (15, 15))

        random_walker_step = RandomWalker()

        params = ["invalid"]
        random_walker_step(image, params)

def test_random_walker_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (15, 15, 3))

        random_walker_step = RandomWalker()

        params = [100]
        random_walker_step(image, params)

def test_random_walker_with_processing_error():
    with pytest.raises(ImageProcessingError):
        random_walker_step = RandomWalker()

        params = [-100]
        random_walker_step(None, params)