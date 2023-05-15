import numpy as np
import pytest


@pytest.fixture
def create_rgb_image():
    img = np.ones((200, 200, 3), dtype=np.uint8)
    img[:, :, 1] = 255  # green image
    return img


@pytest.fixture
def create_grayscale_image():
    grayimg = np.ones((200, 200), dtype=np.uint8)
    grayimg *= 127  # gray image
    return grayimg
