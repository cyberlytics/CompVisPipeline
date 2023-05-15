# Manage the connection to AWS S3
# s3 bucket: team-rot-fatcat-data
import os
from io import BytesIO

import numpy as np
import cv2
import boto3

# ====================================================================================================
# Get AWS S3 connection
class S3Manager:
    def __init__(self):
        self.acessKeyId = os.environ["AWS_ACCESS_KEY_ID"]
        self.secretAccessKey = os.environ["AWS_SECURE_ACCESS_KEY"]
        self.region = os.environ['AWS_DEFAULT_REGION']
    
    def _getConnection(self):
        """
        Get the connection to AWS and the s3 ressource
        
        return: 
            - s3_ressource object
        """
        session = boto3.Session(self.acessKeyId, self.secretAccessKey, region_name=self.region)
        s3 =  session.resource("s3")
        return s3
    
    def _getBucket(self, connection, bucketName="team-rot-fatcat-data"):
        """ 
        Get the s3 bucket from aws 

        input:
            - s3_ressource: s3 ressource object
            - str_bucket_name: name of the s3 bucket

        return: 
            - s3_bucket object
        """
        bucket = connection.Bucket(bucketName)
        return bucket
    
    def _closeConnection(self, connection):
        """ 
        Close the connection to AWS and the s3 bucket 
        This is not explicit necessary due to automatic garbage collection, but it is good practice to close the connection

        input:
            - s3_ressource: s3 ressource object
        """  
        connection.meta.client.close()

    def getImageFromS3(self, objectKey):
        """
        Download the image object from the s3 bucket 
        
        objectKey: path to the object in the s3 bucket

        input:
            - objectKey: path to the object in the s3 bucket

        return:
            - response_metadata (for testing purposes)
                response_metadata['HTTPStatusCode'] == 200: get was successful
            - opencv_image
        """
        connection = self._getConnection()
        bucket = self._getBucket(connection)
        obj = bucket.Object(objectKey)       # get object from s3 bucket 
        response_metadata = obj.get()['ResponseMetadata']                            
        img_bytes = obj.get()['Body'].read()         # read bytes from object

        # convert img_bytes to opencv image
        np_array = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(np_array, cv2.IMREAD_UNCHANGED)
        self._closeConnection(connection)
        return response_metadata, img
    
    def pushImageToS3(self, objectKey, img):
        """ Upload the s3 object to the s3 bucket
        
        input:
            - objectKey: path to the object in the s3 bucket
            - img: opencv image

        return:
            - response_metadata (for testing purpose)
                response_metadata['HTTPStatusCode'] == 200: put was successful
        """
        connection = self._getConnection()
        bucket = self._getBucket(connection)
        _, buffer = cv2.imencode('.jpg', img)        # compresses opencv image and stores it in the memory buffer
        img_as_bytes = BytesIO(buffer).getvalue()    # convert buffer to BytesIO object
        
        # upload object to s3 bucket
        obj = bucket.Object(objectKey)      # build object
        response_metadata = obj.put(Body=img_as_bytes)                  # upload object to s3 bucket
        self._closeConnection(connection)
        return response_metadata['ResponseMetadata']
    
    def deleteImageFromS3(self, objectKey):
        """
        Delete the s3 object with a specific key (name) from the s3 bucket

        input:
            - objectKey: path to the object in the s3 bucket

        return:
            - response_metadata (for testing purpose)
                response_metadata['HTTPStatusCode'] == 204: delete was successful
        """
        connection = self._getConnection()
        bucket = self._getBucket(connection)
        response = bucket.Object(objectKey).delete()
        self._closeConnection(connection)
        return response['ResponseMetadata']
    
    def deleteAllImagesFromS3(self):
        """ 
        Delete all s3 objects from the s3 bucket

        return:
            - response_metadata_list (for testing purpose)
                a list with all deleted response_metadata
                response_metadata['HTTPStatusCode'] == 204: delete was successful  
        """
        connection = self._getConnection()
        bucket = self._getBucket(connection)

        response_list = []
        for obj in bucket.objects.all():
            response = obj.delete()
            response_list.append(response['ResponseMetadata'])

        self._closeConnection(connection)
        return response_list