import numpy as np
import pytest
import cv2
from botocore.exceptions import ClientError


from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError


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
def prepaired_grey_scale_img():
    img = cv2.imread('./tests/testimages/mountain.png')
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return img


@pytest.fixture
def fakeS3Manager():
    class FakeS3Manager:
        def __init__(self):
            self.savedImages = {}

        def getImageFromS3(self, objectKey):
            try:
                return {"HTTPStatusCode": 200}, self.savedImages[objectKey]
            except KeyError:
                return {"HTTPStatusCode": 400}, None

        def pushImageToS3(self, objectKey, img):
            self.savedImages[objectKey] = img
            return {"HTTPStatusCode": 200}

        def deleteImageFromS3(self, objectKey):
            self.savedImages.pop(objectKey)
            return {"HTTPStatusCode": 204}

        def deleteAllImagesFromS3(self):
            response = [{"HTTPStatusCode": 204} for _ in self.savedImages.keys()]
            self.savedImages = {}
            return response

    return FakeS3Manager()


@pytest.fixture
def pipelineStepRaisesError():
    class PipelineStepRaisesError(BaseStep):
        def __call__(self, img, parameters):
            raise ImageProcessingError(message="failed to process Image")

    return PipelineStepRaisesError()
