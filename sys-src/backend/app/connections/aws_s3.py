# Manage the connection to AWS S3
# s3 bucket: team-rot-fatcat-data
import os
from io import BytesIO

import numpy as np
from app.exceptions import AWSError
import cv2
import boto3
from botocore.exceptions import ClientError


# ====================================================================================================
# Get AWS S3 connection
# TODO: ERROR-hanlding
class S3Manager:
    def __init__(self):
        self.acessKeyId = os.environ["AWS_ACCESS_KEY_ID"]
        self.secretAccessKey = os.environ["AWS_SECURE_ACCESS_KEY"]
        self.region = os.environ["AWS_DEFAULT_REGION"]

    def _getConnection(self):
        """
        Get the connection to AWS and the s3 ressource

        return:
            - s3_ressource object
        """
        session = boto3.Session(
            self.acessKeyId, self.secretAccessKey, region_name=self.region
        )
        s3 = session.resource("s3")
        return s3

    def _getBucket(self, connection, bucketName="team-rot-fatcat-data"):
        """
        Get the s3 bucket from aws

        input:
            - connection: s3 ressource object
            - bucketName: name of the s3 bucket

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
            - connection: s3 ressource object
        """
        connection.meta.client.close()

    def getImageFromS3(self, objectKey):
        """
        Download the image object from the s3 bucket

        objectKey: path to the object in the s3 bucket

        input:
            - objectKey: path to the object in the s3 bucket

        return:
            - opencv_image
        """
        try:
            connection = self._getConnection()
            bucket = self._getBucket(connection)
            obj = bucket.Object(objectKey)  # get object from s3 bucket
            img_bytes = obj.get()["Body"].read()  # read bytes from object
        except ClientError:
            raise AWSError(message="Failed to load Data from s3 bucket")
        finally:
            try:
                self._closeConnection(connection)
            except:
                pass
        try:
            # convert img_bytes to opencv image
            np_array = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(np_array, cv2.IMREAD_UNCHANGED)
        except Exception:
            raise AWSError(message="Failed to convert Data to OpenCV Image")
        return img

    def pushImageToS3(self, objectKey, img):
        """Upload the s3 object to the s3 bucket

        input:
            - objectKey: path to the object in the s3 bucket
            - img: opencv image
        """
        try:
            _, buffer = cv2.imencode(
                ".jpg", img
            )  # compresses opencv image and stores it in the memory buffer
            img_as_bytes = BytesIO(
                buffer
            ).getvalue()  # convert buffer to BytesIO object
        except Exception:
            raise AWSError(message="Failed to encode image")

        # upload object to s3 bucket
        try:
            connection = self._getConnection()
            bucket = self._getBucket(connection)
            obj = bucket.Object(objectKey)  # build object
            response_metadata = obj.put(Body=img_as_bytes)  # upload object to s3 bucket
            if response_metadata["ResponseMetadata"]["HTTPStatusCode"] != 200:
                raise AWSError(message="Failed to push image to s3 bucket")
        except ClientError:
            raise AWSError(message="Failed to push image to s3 bucket")
        finally:
            self._closeConnection(connection)

    def deleteImageFromS3(self, objectKey):
        """
        Delete the s3 object with a specific key (name) from the s3 bucket

        input:
            - objectKey: path to the object in the s3 bucket
        """
        try:
            connection = self._getConnection()
            bucket = self._getBucket(connection)
            if objectKey == "defaultImage.jpg":
                raise AWSError(message="Can not delete image with key defaultImage.jpg")
            else:
                response = bucket.Object(objectKey).delete()
                if response["ResponseMetadata"]["HTTPStatusCode"] != 204:
                    raise AWSError(message="Failed to delete Image from S3 bucket")
        except ClientError:
            raise AWSError(message="Failed to delete Image from S3 bucket")
        finally:
            self._closeConnection(connection)

    def deleteAllImagesFromS3(self):
        """
        Delete all s3 objects from the s3 bucket
        """
        try:
            connection = self._getConnection()
            bucket = self._getBucket(connection)
            for obj in bucket.objects.all():
                if obj.key == "defaultImage.jpg":
                    continue
                response = obj.delete()
                if response["ResponseMetadata"]["HTTPStatusCode"] != 204:
                    raise AWSError(message="Failed to delete all Data from S3 bucket")
        except ClientError:
            raise AWSError(message="Failed to delete all Data from S3 bucket")
        finally:
            self._closeConnection(connection)