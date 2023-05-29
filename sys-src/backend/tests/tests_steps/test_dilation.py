import pytest
import numpy as np
from app.Pipeline.Steps.dilation import Dilation

def test_dilation_step_with_expected_result():
    image = np.array([
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]]
        , dtype=np.uint8)

    expected_result = np.array([
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]]
        , dtype=np.uint8)

    params = [0, 3, 3, 1]
    dilation_step = Dilation()
    result = dilation_step(image, params) 
    assert np.array_equal(result, expected_result)
    
def test_dilation_step_with_unexpected_result():
    image = np.array([
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]]
        , dtype=np.uint8)

    not_expected_result = np.array([
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]]
        , dtype=np.uint8)

    params = [0, 3, 3, 1]
    dilation_step = Dilation()
    result = dilation_step(image, params) 
    assert not np.array_equal(result, not_expected_result)


def test_dilation_step_with_invalid_shape():
    image = np.array([
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]]
        , dtype=np.uint8)

    expected_result = np.array([
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]]
        , dtype=np.uint8)

    params = [42, 3, 3, 1]
    dilation_step = Dilation()
    result = dilation_step(image, params)
    assert np.array_equal(result, expected_result)


def test_dilation_step_with_invalid_size():
    image = np.array([
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]]
        , dtype=np.uint8)

    expected_result = np.array([
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]]
        , dtype=np.uint8)

    params = [0, -42, -42, 1]
    dilation_step = Dilation()
    result = dilation_step(image, params)
    assert np.array_equal(result, expected_result)


def test_dilation_step_with_invalid_iterations():
    image = np.array([
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]]
        , dtype=np.uint8)

    expected_result = np.array([
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]]
        , dtype=np.uint8)

    params = [0, 3, 3, -42]
    dilation_step = Dilation()
    result = dilation_step(image, params)
    assert np.array_equal(result, expected_result)