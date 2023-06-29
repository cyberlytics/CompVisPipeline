import numpy as np
import pytest

from app.Pipeline.Steps.connectedComponents import ConnectedComponents
from app.exceptions import ImageProcessingError, WrongParameterError


def test_connectedComponents_valid_parameters():
    step = ConnectedComponents()
    parameters = [4]
    input = np.array([[0, 0, 0, 1],
                      [1, 0, 0, 0],
                      [0, 0, 0, 1]], dtype=np.uint8)
    result = step(input, parameters)
    assert (result == np.array([[0, 0, 0, 1],
                                [2, 0, 0, 0],
                                [0, 0, 0, 3]], dtype=np.uint8)).all()

def test_connectedComponents_raises_WrongParameterError_invalid_image_shape():
    step = ConnectedComponents()
    parameters = [4]
    input = np.array([[[0, 0, 0, 1]]], dtype=np.uint8)
    with pytest.raises(WrongParameterError):
        step(input, parameters)
    
    
def test_connectedComponents_raises_WrongParameterError_for_grayscale(create_grayscale_image):
    step = ConnectedComponents()
    parameters = [4]
    with pytest.raises(WrongParameterError):
        step(create_grayscale_image, parameters)


def test_connectedComponents_raises_WrongParameterError_for_p0_not_4_or_8():
    step = ConnectedComponents()
    parameters = [42]
    input = np.array([[0, 0, 0, 1],
                      [1, 0, 0, 0],
                      [0, 0, 0, 1]], dtype=np.uint8)
    with pytest.raises(WrongParameterError):
        step(input, parameters)
    

def test_connectedComponents_raises_ImageProcessingError():
    step = ConnectedComponents()
    parameters = [42]
    with pytest.raises(ImageProcessingError):
        step(None, parameters)
    
    