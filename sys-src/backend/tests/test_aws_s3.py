import os
import numpy as np
import pytest

import boto3

from app.connections.aws_s3 import get_s3_connection, get_s3_bucket, get_s3_object, put_s3_object

@pytest.fixture
def create_rgb_image():
    img = np.ones((200,200,3), dtype=np.uint8)
    img[:,:,1] = 255      # green image
    yield img

@pytest.fixture
def create_grayscale_image():
    img = np.ones((200,200), dtype=np.uint8)
    img *= 127  # gray image
    yield img

def test_get_s3_connection():
    s3_ressource = get_s3_connection()
    s3_ressource.meta.client.meta

    assert isinstance(s3_ressource, boto3.resources.base.ServiceResource)
    assert s3_ressource.meta.client.meta.region_name == os.environ['AWS_DEFAULT_REGION']


    

def test_get_s3_bucket():
    pass

def test_get_s3_object():
    pass

def test_put_s3_object(create_rgb_image, create_grayscale_image):
    pass

