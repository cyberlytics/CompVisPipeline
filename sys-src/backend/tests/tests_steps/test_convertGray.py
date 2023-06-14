import pytest
import cv2
import numpy as np

from app.Pipeline.Steps.convertGray import ConvertGray
from app.exceptions import ImageProcessingError, WrongParameterError

def test_convert_gray_with_expected_result():
    image = cv2.imread("tests/tests_steps/testpictures/facebook.png")

    convert_gray_step = ConvertGray()

    params = []
    result = convert_gray_step(image, params)

    assert len(result.shape) == 2

def test_convert_gray_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, (10, 10))

        convert_gray_step = ConvertGray()

        params = []
        convert_gray_step(image, params)


