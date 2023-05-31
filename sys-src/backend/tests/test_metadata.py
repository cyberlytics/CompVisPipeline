import pytest 
import cv2
import numpy as np
from app.metadata import Metadata, MetadataError


def test_get_shape_of_grayscaleimage(prepared_grey_scale_img, fakeS3Manager):
    fakeS3Manager.pushImageToS3("42", prepared_grey_scale_img)
    metadata = Metadata("42", fakeS3Manager)
    result = metadata.getMetadata()
    assert result[1] == prepared_grey_scale_img.shape[0]
    assert result[2] == prepared_grey_scale_img.shape[1]
    assert result[3] == 1


def test_get_shape_of_bgrimage(fakeS3Manager, prepared_bgr_img):
    fakeS3Manager.pushImageToS3("42", prepared_bgr_img)
    metadata = Metadata("42", fakeS3Manager)
    result = metadata.getMetadata()
    assert result[1] == prepared_bgr_img.shape[0]
    assert result[2] == prepared_bgr_img.shape[1]
    assert result[3] == prepared_bgr_img.shape[2]

def test_raise_MeataDataError_on_invalid_channel_number(fakeS3Manager):
    image = np.array([[[1,2,3,4]]])
    fakeS3Manager.pushImageToS3("42", image)
    metaData = Metadata("42", fakeS3Manager)
    with pytest.raises(MetadataError) as e:
        metaData.getMetadata()
    assert e.value.message == "Unkonwn colorspace: Could not plot histogram"

def test_rais_MeataDataError_on_invalid_shape(fakeS3Manager):
    image = np.array([1])
    fakeS3Manager.pushImageToS3("42", image)
    metaData = Metadata("42", fakeS3Manager)
    with pytest.raises(MetadataError) as e:
        metaData.getMetadata()
    assert e.value.message == "Unknown shape of image"

def test_hist_is_saved_to_s3(fakeS3Manager, prepared_bgr_img):
    fakeS3Manager.pushImageToS3("42", prepared_bgr_img)
    metadata = Metadata("42", fakeS3Manager)
    result = metadata.getMetadata()
    assert fakeS3Manager.getImageFromS3(result[0])[0] == {"HTTPStatusCode": 200} 
    assert len(fakeS3Manager.getImageFromS3(result[0])[1].shape) == 3
    assert fakeS3Manager.getImageFromS3(result[0])[1].shape[2] == 3

def test_hist_is_saved_to_s3(fakeS3Manager, prepared_grey_scale_img):
    fakeS3Manager.pushImageToS3("42", prepared_grey_scale_img)
    metadata = Metadata("42", fakeS3Manager)
    result = metadata.getMetadata()
    assert fakeS3Manager.getImageFromS3(result[0])[0] == {"HTTPStatusCode": 200} 
    assert len(fakeS3Manager.getImageFromS3(result[0])[1].shape) == 3
    assert fakeS3Manager.getImageFromS3(result[0])[1].shape[2] == 3

def test_raise_MetaDataError_for_invalid_image_id(fakeS3Manager):
    metadata = Metadata("42", fakeS3Manager)
    with pytest.raises(MetadataError) as e:
        metadata.getMetadata()
    assert e.value.message == "failed to load image from s3 bucket"