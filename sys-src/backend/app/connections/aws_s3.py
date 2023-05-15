# Manage the connection to AWS S3
# s3 bucket: team-rot-fatcat-data
import os
from io import BytesIO

import numpy as np
import matplotlib.pyplot as plt
import cv2
import boto3

# ====================================================================================================
# Get AWS S3 connection
def get_s3_connection():
    """
    Get the connection to AWS and the s3 ressource
    
    return: 
        - s3_ressource object
    """
    # get boto3 session to connect to AWS
    aws_session = boto3.Session(aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'], aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'], region_name=os.environ['AWS_DEFAULT_REGION'])
    
    # get s3 ressource
    s3_ressource = aws_session.resource('s3')

    return s3_ressource

def get_s3_bucket(s3_ressource, str_bucket_name='team-rot-fatcat-data'):
    """ 
    Get the s3 bucket from aws 

    input:
        - s3_ressource: s3 ressource object
        - str_bucket_name: name of the s3 bucket

    return: 
        - s3_bucket object
    """
    # get s3 buckets
    s3_bucket = s3_ressource.Bucket(str_bucket_name)

    return s3_bucket

def close_s3_connection(s3_ressource):
    """ 
    Close the connection to AWS and the s3 bucket 
    This is not explicit necessary due to automatic garbage collection, but it is good practice to close the connection

    input:
        - s3_ressource: s3 ressource object
    """
    s3_ressource.meta.client.close()


# ====================================================================================================
# Get and put s3 objects
def get_s3_object(s3_bucket, str_object_key):
    """
    Download the s3 object from the s3 bucket 
    
    s3_bucket: s3_bucket object
    str_object_key: path to the object in the s3 bucket

    input:
        - s3_bucket: s3_bucket object
        - str_object_key: path to the object in the s3 bucket

    return:
        - response_metadata (for testing purposes)
            response_metadata['HTTPStatusCode'] == 200: successful
        - opencv_image
    """
    obj = s3_bucket.Object(str_object_key)       # get object from s3 bucket 
    response_metadata = obj.get()['ResponseMetadata']                            
    img_bytes = obj.get()['Body'].read()         # read bytes from object

    # convert img_bytes to opencv image
    np_array = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_UNCHANGED)

    return response_metadata, img

def put_s3_object(s3_bucket, str_object_key, img):
    """ Upload the s3 object to the s3 bucket
    
    input:
        - s3_bucket: s3_bucket object
        - str_object_key: path to the object in the s3 bucket
        - img: opencv image

    return:
        - response_metadata (for testing purposes)
            response_metadata['HTTPStatusCode'] == 200: successful

    """
    _, buffer = cv2.imencode('.jpg', img)        # compresses opencv image and stores it in the memory buffer
    img_as_bytes = BytesIO(buffer).getvalue()    # convert buffer to BytesIO object
    
    # upload object to s3 bucket
    obj = s3_bucket.Object(str_object_key)      # build object
    response_metadata = obj.put(Body=img_as_bytes)                  # upload object to s3 bucket

    return response_metadata['ResponseMetadata']


# ====================================================================================================
# Delte s3 objects
def delete_s3_object(s3_bucket, str_object_key):
    """
    Delete the s3 object with a specific key (name) from the s3 bucket

    input:
        - s3_bucket: s3_bucket object
        - str_object_key: path to the object in the s3 bucket

    return:
        - response_metadata (for testing purposes)
            response_metadata['HTTPStatusCode'] == 204: delete was successful
    """
    response = s3_bucket.Object(str_object_key).delete()

    return response['ResponseMetadata']

def delete_all_s3_objects(s3_bucket):
    """ 
    Delete all s3 objects from the s3 bucket

    input:
        - s3_bucket: s3_bucket object
        - str_object_key: path to the object in the s3 bucket

    return:
        - response_metadata_list (for testing purposes)
            a list with all deleted response_metadata
            response_metadata['HTTPStatusCode'] == 204: delete was successful  
    """
    response_list = []
    for obj in s3_bucket.objects.all():
        response = obj.delete()
        response_list.append(response['ResponseMetadata'])

    return response_list


if __name__ == '__main__':
    s3_ressource = get_s3_connection()
    s3_bucket = get_s3_bucket(s3_ressource)
    
    _, img = get_s3_object(s3_bucket, "Big_Fat_Red_Cat.jpg")
    print(img.shape)
    
    # cv2.imshow("test", img)
    # cv2.waitKey(0)
    
    _ = put_s3_object(s3_bucket, "test_grey.jpg", img)

    close_s3_connection(s3_ressource)