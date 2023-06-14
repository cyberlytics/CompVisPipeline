import numpy as np
import pytest
import cv2

from app.exceptions import ImageProcessingError, AWSError
from app.Pipeline.Steps.baseStep import BaseStep


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


@pytest.fixture
def prepared_grey_scale_img():
    img = cv2.imread("./tests/testimages/mountain.png")
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return img


@pytest.fixture
def prepared_bgr_img():
    img = cv2.imread("./tests/testimages/mountain.png")
    return img

@pytest.fixture
def image_with_alpha_channel():
    img = cv2.imread("./tests/testimages/transparent_background.png", cv2.IMREAD_UNCHANGED)
    return img


@pytest.fixture
def fakeS3Manager():
    class FakeS3Manager:
        def __init__(self):
            self.savedImages = {}

        def getImageFromS3(self, objectKey):
            try:
                return self.savedImages[objectKey]
            except KeyError:
                raise AWSError(message="failed to get Image from S3 bucket")

        def pushImageToS3(self, objectKey, img):
            self.savedImages[objectKey] = img

        def deleteImageFromS3(self, objectKey):
            self.savedImages.pop(objectKey)

        def deleteAllImagesFromS3(self):
            self.savedImages = {}

    return FakeS3Manager()


@pytest.fixture
def pipelineStepRaisesError():
    class PipelineStepRaisesError(BaseStep):
        def __call__(self, img, parameters):
            raise ImageProcessingError(message="failed to process Image")

    return PipelineStepRaisesError()

def pytest_collection_modifyitems(items, config):
    for item in items:
        if not any(item.iter_markers()):
            item.add_marker("unmarked")