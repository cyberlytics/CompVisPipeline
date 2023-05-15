import os
import numpy as np
import pytest

import boto3
from botocore.exceptions import ClientError

from app.connections.aws_s3 import get_s3_connection, get_s3_bucket, get_s3_object, put_s3_object
import cv2
@pytest.fixture
def create_rgb_image():
    img = np.ones((200,200,3), dtype=np.uint8)
    img[:,:,1] = 255      # green image
    return img

@pytest.fixture
def create_grayscale_image():
    grayimg = np.ones((200,200), dtype=np.uint8)
    grayimg *= 127  # gray image
    return grayimg

def test_get_s3_connection():
    s3_ressource = get_s3_connection()
    
    assert isinstance(s3_ressource, boto3.resources.base.ServiceResource)                   # check if type is correct
    assert s3_ressource.meta.client.meta.region_name == os.environ['AWS_DEFAULT_REGION']    # check if region is correct 
    assert len(list(s3_ressource.buckets.all())) > 0                                        # check if there are buckets available


def test_get_s3_bucket():
    s3_ressource = get_s3_connection()

    bucket_names = [bucket.name for bucket in s3_ressource.buckets.all()]

    for bucket_name in bucket_names:
        # check if access to other then 'team-rot-fatcat-data' is denied
        # if access is diened, then a ClientError is raised
        if bucket_name != 'team-rot-fatcat-data':
            with pytest.raises(ClientError):
                bucket = get_s3_bucket(s3_ressource, bucket_name)
                meta_data = bucket.meta.client.head_bucket(Bucket=bucket_name)
        else:
            bucket = get_s3_bucket(s3_ressource, bucket_name)
            meta_data = bucket.meta.client.head_bucket(Bucket=bucket_name)

            assert meta_data['ResponseMetadata']['HTTPStatusCode'] == 200      # check if bucket exists
            assert bucket.name == bucket_name                                  # check if bucket name is correct
                
def test_get_s3_object(create_rgb_image, create_grayscale_image):
    s3_ressource = get_s3_connection()
    s3_bucket = get_s3_bucket(s3_ressource, 'team-rot-fatcat-data')


    # send data to s3 bucket
    _ = put_s3_object(s3_bucket, 'test_rgb_image.jpg', create_rgb_image)
    _ = put_s3_object(s3_bucket, 'test_grayscale_image.jpg', create_grayscale_image)

    # get data to s3 bucket
    response_get_rgb, get_image = get_s3_object(s3_bucket, 'test_rgb_image.jpg')
    response_get_gray, get_grayscale_image = get_s3_object(s3_bucket, 'test_grayscale_image.jpg')


    # Check if send data is same like get data - rgb
    assert response_get_rgb['HTTPStatusCode'] == 200                    # check if upload was successful
    assert np.array_equal(create_rgb_image, get_image)                  # check if send data is same like get data
    assert create_rgb_image.shape == get_image.shape                    # check if shape is correct

    # Check if send data is same like get data - grayscale
    assert response_get_gray['HTTPStatusCode'] == 200                   # check if upload was successful
    assert np.array_equal(create_grayscale_image, get_grayscale_image)  # check if send data is same like get data
    assert create_grayscale_image.shape == get_grayscale_image.shape    # check if shape is correct

    # delete data from s3 bucket
    s3_bucket.Object('test_rgb_image.jpg').delete()
    s3_bucket.Object('test_grayscale_image.jpg').delete()



def test_put_s3_object(create_rgb_image, create_grayscale_image):
    s3_ressource = get_s3_connection()
    s3_bucket = get_s3_bucket(s3_ressource, 'team-rot-fatcat-data')


    # send data to s3 bucket
    response_put_rgb = put_s3_object(s3_bucket, 'test_rgb_image.jpg', create_rgb_image)
    response_put_gray = put_s3_object(s3_bucket, 'test_grayscale_image.jpg', create_grayscale_image)

    # get data to s3 bucket
    _, get_image = get_s3_object(s3_bucket, 'test_rgb_image.jpg')
    _, get_grayscale_image = get_s3_object(s3_bucket, 'test_grayscale_image.jpg')


    # Check for rgb image
    assert response_put_rgb['HTTPStatusCode'] == 200                   # check if upload was successful
    assert np.array_equal(create_rgb_image, get_image)                 # check if send data is same like get data
    assert create_rgb_image.shape == get_image.shape                   # check if shape is correct

    # Check for grayscale image
    assert response_put_rgb['HTTPStatusCode'] == 200                   # check if upload was successful
    assert np.array_equal(create_grayscale_image, get_grayscale_image) # check if send data is same like get data
    assert create_grayscale_image.shape == get_grayscale_image.shape   # check if shape is correct


    # delete data from s3 bucket
    s3_bucket.Object('test_rgb_image.jpg').delete()
    s3_bucket.Object('test_grayscale_image.jpg').delete()
