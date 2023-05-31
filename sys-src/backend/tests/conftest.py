import numpy as np
import pytest
from botocore.exceptions import ClientError

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError
from app.connections.aws_s3 import AWSError


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
