import pytest 
import cv2
import numpy as np
from app.metadata import Metadata, MetadataError


def test_get_shape_of_grayscaleimage(prepared_grey_scale_img, fakeS3Manager):
    metadata = Metadata(fakeS3Manager)
    result = metadata.getMetadata(prepared_grey_scale_img)
    assert result[1] == prepared_grey_scale_img.shape[0]
    assert result[2] == prepared_grey_scale_img.shape[1]
    assert result[3] == 1


def test_get_shape_of_bgrimage(fakeS3Manager, prepared_bgr_img):
    metadata = Metadata(fakeS3Manager)
    result = metadata.getMetadata(prepared_bgr_img)
    assert result[1] == prepared_bgr_img.shape[0]
    assert result[2] == prepared_bgr_img.shape[1]
    assert result[3] == prepared_bgr_img.shape[2]

def test_raise_MeataDataError_on_invalid_channel_number(fakeS3Manager):
    image = np.array([[[1,2,3,4]]])
    metaData = Metadata(fakeS3Manager)
    with pytest.raises(MetadataError) as e:
        metaData.getMetadata(image)
    assert e.value.message == "Unkonwn colorspace: Could not plot histogram"

def test_rais_MeataDataError_on_invalid_shape(fakeS3Manager):
    image = np.array([1])
    metaData = Metadata(fakeS3Manager)
    with pytest.raises(MetadataError) as e:
        metaData.getMetadata(image)
    assert e.value.message == "Unknown shape of image"

def test_hist_is_saved_to_s3(fakeS3Manager, prepared_bgr_img):
    metadata = Metadata(fakeS3Manager)
    result = metadata.getMetadata(prepared_bgr_img)
    assert len(fakeS3Manager.getImageFromS3(result[0]).shape) == 3
    assert fakeS3Manager.getImageFromS3(result[0]).shape[2] == 3

def test_hist_is_saved_to_s3(fakeS3Manager, prepared_grey_scale_img):
    metadata = Metadata(fakeS3Manager)
    result = metadata.getMetadata(prepared_grey_scale_img)
    assert len(fakeS3Manager.getImageFromS3(result[0]).shape) == 3
    assert fakeS3Manager.getImageFromS3(result[0]).shape[2] == 3
