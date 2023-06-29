import os
import requests
import cv2
import numpy as np
from uuid import uuid4

from app.connections.aws_s3 import S3Manager
from app.exceptions import BaseError
from app.metadata import Metadata



class AiFatCatManager:
    def __init__(self, s3Manager=None):
        self.s3Manager = s3Manager or S3Manager()
        self.metaDataManager = Metadata(self.s3Manager)
    
    def getRandomAiImage(self):
        try:
            random_image_url = requests.get("https://api.thecatapi.com/v1/images/search").json()[0]["url"]
            imageBytes = requests.get(random_image_url).content
        except Exception:
            raise BaseError(message="Failed to get Image from thecatapi")  
        try:
            array = np.frombuffer(imageBytes, np.uint8)
            img = cv2.imdecode(array, cv2.IMREAD_UNCHANGED)
        except Exception:
            raise BaseError(message="Failed to convert response from thecatapi to OpneCV image")
        try:
            id = str(uuid4()) + ".jpeg"
            self.s3Manager.pushImageToS3(id, img)
            metaData = self.metaDataManager.getMetadata(img)
        except Exception as e:
            raise e
        return {
            "imageId": id,
            "histId": metaData[0],
            "height": metaData[1],
            "width": metaData[2],
            "channels": metaData[3],
        }

