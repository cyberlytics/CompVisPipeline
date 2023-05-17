import os
import numpy as np
import pytest

import boto3
from botocore.exceptions import ClientError

from app.connections.aws_s3 import S3Manager


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
    _ = s3Manager.pushImageToS3("test_rgb_image.jpg", create_rgb_image)
    _ = s3Manager.pushImageToS3("test_grayscale_image.jpg", create_grayscale_image)

    # get data to s3 bucket
    response_get_rgb, get_image = s3Manager.getImageFromS3("test_rgb_image.jpg")
    response_get_gray, get_grayscale_image = s3Manager.getImageFromS3(
        "test_grayscale_image.jpg"
    )

    # Check if send data is same like get data - rgb
    assert response_get_rgb["HTTPStatusCode"] == 200  # check if upload was successful
    assert np.array_equal(
        create_rgb_image, get_image
    )  # check if send data is same like get data
    assert create_rgb_image.shape == get_image.shape  # check if shape is correct

    # Check if send data is same like get data - grayscale
    assert response_get_gray["HTTPStatusCode"] == 200  # check if upload was successful
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
    response_put_rgb = s3Manager.pushImageToS3("test_rgb_image.jpg", create_rgb_image)
    response_put_gray = s3Manager.pushImageToS3(
        "test_grayscale_image.jpg", create_grayscale_image
    )

    # get data to s3 bucket
    _, get_image = s3Manager.getImageFromS3("test_rgb_image.jpg")
    _, get_grayscale_image = s3Manager.getImageFromS3("test_grayscale_image.jpg")

    # Check for rgb image
    assert response_put_rgb["HTTPStatusCode"] == 200  # check if upload was successful
    assert np.array_equal(
        create_rgb_image, get_image
    )  # check if send data is same like get data
    assert create_rgb_image.shape == get_image.shape  # check if shape is correct

    # Check for grayscale image
    assert response_put_gray["HTTPStatusCode"] == 200  # check if upload was successful
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
    _ = s3Manager.pushImageToS3("test_rgb_image.jpg", create_rgb_image)
    _ = s3Manager.pushImageToS3("test_grayscale_image.jpg", create_grayscale_image)

    # delete data from s3 bucket
    response_delete_rgb = s3Manager.deleteImageFromS3("test_rgb_image.jpg")
    response_delete_gray = s3Manager.deleteImageFromS3("test_grayscale_image.jpg")

    # Check
    assert (
        response_delete_rgb["HTTPStatusCode"] == 204
    )  # check if delete was successful
    assert (
        response_delete_gray["HTTPStatusCode"] == 204
    )  # check if delete was successful

    with pytest.raises(ClientError):
        s3Manager.getImageFromS3("test_rgb_image.jpg")
        s3Manager.getImageFromS3("test_grayscale_image.jpg")


@pytest.mark.aws
def test_delete_all_s3_objects(create_rgb_image, create_grayscale_image):
    s3Manager = S3Manager()

    # send data to s3 bucket
    _ = s3Manager.pushImageToS3("test_rgb_image.jpg", create_rgb_image)
    _ = s3Manager.pushImageToS3("test_grayscale_image.jpg", create_grayscale_image)

    # delete all data from s3 bucket
    response_delete_all = s3Manager.deleteAllImagesFromS3()

    # Check if all data was deleted
    for response in response_delete_all:
        assert response["HTTPStatusCode"] == 204  # check if delete was successful
