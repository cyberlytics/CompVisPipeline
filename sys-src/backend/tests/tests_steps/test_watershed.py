import pytest
import numpy as np

from app.Pipeline.Steps.watershed import Watershed
from app.exceptions import ImageProcessingError, WrongParameterError

def test_watershed_with_expected_result():
    image = np.zeros([15, 15]).astype("uint8")
    image[2:5, 5:11] = 120
    image[5:10, 9:14] = 170
    image[5:13, 2:5] = 220

    excepted_result = np.array([
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
       [0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 3, 3, 3, 3, 0],
       [0, 0, 2, 2, 2, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0],
       [0, 0, 2, 2, 2, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0],
       [0, 0, 2, 2, 2, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0],
       [0, 0, 2, 2, 2, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0],
       [0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])

    watershed_step = Watershed()

    params = []
    result = watershed_step(image, params)

    assert np.array_equal(result, excepted_result)

def test_watershed_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (15, 15, 3)).astype("uint8")

        watershed_step = Watershed()

        params = []
        watershed_step(image, params)

def test_watershed_with_invalid_image_type():
    with pytest.raises(ImageProcessingError):
        image = np.random.randint(0, 255, (15, 15)).astype(np.float32)

        watershed_step = Watershed()

        params = []
        watershed_step(image, params)