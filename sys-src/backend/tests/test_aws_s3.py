import os
import numpy as np
import pytest

import boto3
from botocore.exceptions import ClientError

from app.connections.aws_s3 import get_s3_connection, get_s3_bucket, get_s3_object, put_s3_object

@pytest.fixture
def create_rgb_image():
    img = np.ones((200,200,3), dtype=np.uint8)
    img[:,:,1] = 255      # green image
    return img

@pytest.fixture
def create_grayscale_image():
    img = np.ones((200,200), dtype=np.uint8)
    img *= 127  # gray image
    return img

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
                

def test_get_s3_object():
    pass

def test_put_s3_object(create_rgb_image, create_grayscale_image):
    pass

