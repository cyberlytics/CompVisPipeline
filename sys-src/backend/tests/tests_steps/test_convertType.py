import pytest
import numpy as np

from app.Pipeline.Steps.convertType import ConvertType
from app.exceptions import WrongParameterError

def test_convert_type_with_expected_result():
    image = np.random.randint(0, 255, (10, 10)).astype(np.float32)

    convert_type_step = ConvertType()

    params = []
    result = convert_type_step(image, params)

    assert result.dtype == np.uint8

def test_convert_type_with_invalid_image_shape():
    with pytest.raises(WrongParameterError):
        image = np.random.randint(0, 255, 1).astype(np.float32)

        convert_type_step = ConvertType()

        params = []
        convert_type_step(image, params)

def test_convert_type_with_rgb_image():
    image = np.random.randint(0, 255, (10, 10, 3)).astype(np.float32)

    convert_type_step = ConvertType()

    params = []
    result = convert_type_step(image, params)

    assert result.dtype == np.uint8