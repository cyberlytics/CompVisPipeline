import pytest 
import cv2
from app.metadata import Metadata, MetadataError


# Response Metadate raise error

# maße graustufenbild und farbbild und Fehlerhaftes bild

def test_get_shape_of_grayscaleimage(prepaired_grey_scale_img, fakeS3Manager):
    fakeS3Manager.pushImageToS3("42", prepaired_grey_scale_img)
    metadata = Metadata("42", fakeS3Manager)
    result = metadata.getMetadata()
    assert result[1] == prepaired_grey_scale_img.shape[0]
    assert result[2] == prepaired_grey_scale_img.shape[1]
    assert result[3] == 1


def test_get_shape_of_bgrimage():
    pass

def test_get_shape_of_twochannelimage():
    pass


# histogram grayscale, bgr, fehler 
# id geben lassen und aus s3 holen und vergleichen


# für routes auch neuen test (in anderer Datei)