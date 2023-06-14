import os
import numpy as np
import pytest

from botocore.exceptions import ClientError
import boto3

from app.connections.aws_s3 import S3Manager, AWSError


@pytest.mark.aws
def test_get_s3_connection():
    s3Manager = S3Manager()
    s3_ressource = s3Manager._getConnection()

    assert isinstance(
        s3_ressource, boto3.resources.base.ServiceResource
    )  # check if type is correct
    assert (
        s3_ressource.meta.client.meta.region_name == os.environ["AWS_DEFAULT_REGION"]
    )  # check if region is correct
    assert (
        len(list(s3_ressource.buckets.all())) > 0
    )  # check if there are buckets available


@pytest.mark.aws
def test_get_s3_bucket():
    s3Manager = S3Manager()
    s3_ressource = s3Manager._getConnection()

    bucket_names = [bucket.name for bucket in s3_ressource.buckets.all()]

    for bucket_name in bucket_names:
        # check if access to other then 'team-rot-fatcat-data' is denied
        # if access is diened, then a ClientError is raised
        if bucket_name != "team-rot-fatcat-data":
            with pytest.raises(ClientError):
                bucket = s3Manager._getBucket(s3_ressource, bucket_name)
                meta_data = bucket.meta.client.head_bucket(Bucket=bucket_name)
        else:
            bucket = s3Manager._getBucket(s3_ressource, bucket_name)
            meta_data = bucket.meta.client.head_bucket(Bucket=bucket_name)

            assert (
                meta_data["ResponseMetadata"]["HTTPStatusCode"] == 200
            )  # check if bucket exists
            assert bucket.name == bucket_name  # check if bucket name is correct


@pytest.mark.aws
def test_get_s3_object(create_rgb_image, create_grayscale_image):
    s3Manager = S3Manager()

    # send data to s3 bucket
    s3Manager.pushImageToS3("test_rgb_image.jpg", create_rgb_image)
    s3Manager.pushImageToS3("test_grayscale_image.jpg", create_grayscale_image)

    # get data to s3 bucket
    get_image = s3Manager.getImageFromS3("test_rgb_image.jpg")
    get_grayscale_image = s3Manager.getImageFromS3("test_grayscale_image.jpg")

    # Check if send data is same like get data - rgb
    assert np.array_equal(
        create_rgb_image, get_image
    )  # check if send data is same like get data
    assert create_rgb_image.shape == get_image.shape  # check if shape is correct

    # Check if send data is same like get data - grayscale
    assert np.array_equal(
        create_grayscale_image, get_grayscale_image
    )  # check if send data is same like get data
    assert (
        create_grayscale_image.shape == get_grayscale_image.shape
    )  # check if shape is correct

    # delete data from s3 bucket
    s3Manager.deleteImageFromS3("test_rgb_image.jpg")
    s3Manager.deleteImageFromS3("test_grayscale_image.jpg")


@pytest.mark.aws
def test_put_s3_object(create_rgb_image, create_grayscale_image):
    s3Manager = S3Manager()

    # send data to s3 bucket
    s3Manager.pushImageToS3("test_rgb_image.jpg", create_rgb_image)
    s3Manager.pushImageToS3("test_grayscale_image.jpg", create_grayscale_image)

    # get data to s3 bucket
    get_image = s3Manager.getImageFromS3("test_rgb_image.jpg")
    get_grayscale_image = s3Manager.getImageFromS3("test_grayscale_image.jpg")

    # Check for rgb image
    assert np.array_equal(
        create_rgb_image, get_image
    )  # check if send data is same like get data
    assert create_rgb_image.shape == get_image.shape  # check if shape is correct

    # Check for grayscale image
    assert np.array_equal(
        create_grayscale_image, get_grayscale_image
    )  # check if send data is same like get data
    assert (
        create_grayscale_image.shape == get_grayscale_image.shape
    )  # check if shape is correct

    # delete data from s3 bucket
    s3Manager.deleteImageFromS3("test_rgb_image.jpg")
    s3Manager.deleteImageFromS3("test_grayscale_image.jpg")


@pytest.mark.aws
def test_delete_s3_object(create_rgb_image, create_grayscale_image):
    s3Manager = S3Manager()

    # send data to s3 bucket
    s3Manager.pushImageToS3("test_rgb_image.jpg", create_rgb_image)
    s3Manager.pushImageToS3("test_grayscale_image.jpg", create_grayscale_image)

    assert s3Manager.getImageFromS3("test_rgb_image.jpg") is not None
    assert s3Manager.getImageFromS3("test_grayscale_image.jpg") is not None

    # delete data from s3 bucket
    s3Manager.deleteImageFromS3("test_rgb_image.jpg")
    s3Manager.deleteImageFromS3("test_grayscale_image.jpg")

    with pytest.raises(AWSError):
        s3Manager.getImageFromS3("test_rgb_image.jpg")
        s3Manager.getImageFromS3("test_grayscale_image.jpg")


@pytest.mark.aws
def test_delete_all_s3_objects(create_rgb_image, create_grayscale_image):
    s3Manager = S3Manager()

    # send data to s3 bucket
    s3Manager.pushImageToS3("test_rgb_image.jpg", create_rgb_image)
    s3Manager.pushImageToS3("test_grayscale_image.jpg", create_grayscale_image)

    assert s3Manager.getImageFromS3("test_rgb_image.jpg") is not None
    assert s3Manager.getImageFromS3("test_grayscale_image.jpg") is not None

    # delete all data from s3 bucket
    s3Manager.deleteAllImagesFromS3()
    with pytest.raises(AWSError):
        s3Manager.getImageFromS3("test_rgb_image.jpg")
        s3Manager.getImageFromS3("test_grayscale_image.jpg")


@pytest.mark.aws
def test_getImageFromS3_raises_AWSError_if_key_not_exists():
    s3Manager = S3Manager()
    with pytest.raises(AWSError):
        s3Manager.getImageFromS3("THIS_KEY_SHOULD_NOT_EXIST")
