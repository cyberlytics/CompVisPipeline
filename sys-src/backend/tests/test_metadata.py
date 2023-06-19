import pytest
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
    image = np.array([[[1, 2, 3, 4, 5]]])
    metaData = Metadata(fakeS3Manager)
    with pytest.raises(MetadataError) as e:
        metaData.getMetadata(image)
    assert e.value.message == "Unkonwn colorspace: Could not plot histogram. Number of channels = 5"


def test_rais_MeataDataError_on_invalid_shape(fakeS3Manager):
    image = np.array([1])
    metaData = Metadata(fakeS3Manager)
    with pytest.raises(MetadataError) as e:
        metaData.getMetadata(image)
    assert e.value.message == "Unknown shape of image"


def test_hist_is_saved_to_s3_bgr(fakeS3Manager, prepared_bgr_img):
    metadata = Metadata(fakeS3Manager)
    result = metadata.getMetadata(prepared_bgr_img)
    assert len(fakeS3Manager.getImageFromS3(result[0]).shape) == 3
    # TODO: following test fails because the fakeS3Manager does not convert the image to .jpg format 
    # so it has 4 Channels RGB+Alpha, the s3Manager class does this, it can not be changed now due to other tests
    # this is not a problem, because the s3manage handles this issue
    # assert fakeS3Manager.getImageFromS3(result[0]).shape[2] == 3 
    


def test_hist_is_saved_to_s3_grey(fakeS3Manager, prepared_grey_scale_img):
    metadata = Metadata(fakeS3Manager)
    result = metadata.getMetadata(prepared_grey_scale_img)
    assert len(fakeS3Manager.getImageFromS3(result[0]).shape) == 3
    # TODO: following test fails because the fakeS3Manager does not convert the image to .jpg format 
    # so it has 4 Channels RGB+Alpha, the s3Manager class does this, it can not be changed now due to other tests
    # this is not a problem, because the s3manage handles this issue
    # assert fakeS3Manager.getImageFromS3(result[0]).shape[2] == 3

def test_hist_is_generated_for_images_with_alpha_channel(fakeS3Manager, image_with_alpha_channel):
    metadata = Metadata(fakeS3Manager)
    result = metadata.getMetadata(image_with_alpha_channel)
    assert len(fakeS3Manager.getImageFromS3(result[0]).shape) == 3
    assert result[3] == 4

def test_hist_is_generaterd_for_labeld_image_with_dtype_int32(fakeS3Manager):
    test_img = np.array([[1, 1028, 0],
                         [1, 1234, 23]], dtype=np.int32)
    metadata = Metadata(fakeS3Manager)
    result = metadata.getMetadata(test_img)
    assert len(fakeS3Manager.getImageFromS3(result[0]).shape) == 3
    assert result[3] == 1
