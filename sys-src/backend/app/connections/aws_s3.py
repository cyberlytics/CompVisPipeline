# Manage the connection to AWS S3
# s3 bucket: team-rot-fatcat-data
import os
from io import BytesIO

import numpy as np
import matplotlib.pyplot as plt
import cv2
import boto3

def get_s3_connection():
    """ Get the connection to AWS and the s3 ressource """
    # get boto3 session to connect to AWS
    aws_session = boto3.Session(aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'], aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'], region_name=os.environ['AWS_DEFAULT_REGION'])
    
    # get s3 ressource
    s3_ressource = aws_session.resource('s3')

    return s3_ressource

def get_s3_bucket(s3_ressource, str_bucket_name='team-rot-fatcat-data'):
    """ Get the s3 bucket from aws """

    # get s3 buckets
    s3_bucket = s3_ressource.Bucket(str_bucket_name)

    return s3_bucket

def get_s3_object(s3_bucket, str_object_key):
    """
    Download the s3 object from the s3 bucket 
    
    s3_bucket: s3_bucket object
    str_object_key: path to the object in the s3 bucket

    return: opencv_image
    """
    obj = s3_bucket.Object(str_object_key)       # get object from s3 bucket 
    img_bytes = obj.get()['Body'].read()         # read bytes from object

    # convert img_bytes to opencv image
    np_array = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    return img
    

def put_s3_object(s3_bucket, str_object_key, img):
    """ Upload the s3 object to the s3 bucket
    
    s3_bucket: s3_bucket object
    str_object_key: path to the object in the s3 bucket
    img: opencv image
    """
    _, buffer = cv2.imencode('.jpg', img)        # compresses opencv image and stores it in the memory buffer
    img_as_bytes = BytesIO(buffer).getvalue()    # convert buffer to BytesIO object
    
    # upload object to s3 bucket
    obj = s3_bucket.Object(str_object_key)      # build object
    obj.put(Body=img_as_bytes)                  # upload object to s3 bucket


def close_s3_connection(s3_ressource):
    """ Close the connection to AWS and the s3 bucket """
    s3_ressource.meta.client.close()


if __name__ == '__main__':
    s3_ressource = get_s3_connection()
    s3_bucket = get_s3_bucket(s3_ressource)
    
    img = get_s3_object(s3_bucket, "Big_Fat_Red_Cat.jpg")
    print(img.shape)
    
    # cv2.imshow("test", img)
    # cv2.waitKey(0)
    
    put_s3_object(s3_bucket, "test_grey.jpg", img)

    close_s3_connection(s3_ressource)