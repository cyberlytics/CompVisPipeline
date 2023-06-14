import pytest
import cv2

from app.exceptions import ImageProcessingError
from app.Pipeline.Steps.medianFilter import MedianFilter


def test_kernel_has_to_be_positive_exception():
    img_ori = cv2.imread("tests/tests_steps/testpictures/facebook.png")
    params = [-1]

    median_filter_step = MedianFilter()

    with pytest.raises(ImageProcessingError):
        median_filter_step(img_ori, params)


def test_even_kernel_throws_exception():
    img_ori = cv2.imread("tests/tests_steps/testpictures/facebook.png")
    params = [4]

    median_filter_step = MedianFilter()

    with pytest.raises(ImageProcessingError):
        median_filter_step(img_ori, params)


def test_odd_kernel_throws_no_exception():
    img_ori = cv2.imread("tests/tests_steps/testpictures/facebook.png")
    params = [3]

    median_filter_step = MedianFilter()

    median_filter_step(img_ori, params)
