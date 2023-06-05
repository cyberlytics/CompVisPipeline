import pytest
from app.Pipeline.Steps.averagingFilter import AveragingFilter
import cv2


def test_averagingFilterWithFacebookThumbnail():
    # prepare
    img_ori = cv2.imread("tests/tests_steps/testpictures/facebook.png")
    img_blurred = cv2.imread("tests/tests_steps/testpictures/facebook_blurred.png")
    params = [3, 3]

    # act
    averaging_filter_step = AveragingFilter()
    new_blurred = averaging_filter_step(img_ori, params)

    # assert
    diff = cv2.absdiff(new_blurred, img_blurred)
    assert sum(diff.flatten()) == 0


def test_kernel_has_to_be_positive_exception():
    img_ori = cv2.imread("tests/tests_steps/testpictures/facebook.png")
    params = [-1, 1]

    averaging_filter_step = AveragingFilter()

    with pytest.raises(Exception):
        averaging_filter_step(img_ori, params)
