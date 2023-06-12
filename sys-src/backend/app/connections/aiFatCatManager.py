import requests
import cv2
import numpy as np
from uuid import uuid4

from app.connections.aws_s3 import S3Manager
from app.metadata import Metadata



class AiFatCatManager:
    def __init__(self, s3Manager=None):
        self.s3Manager = s3Manager or S3Manager()
        self.metaDataManager = Metadata(self.s3Manager)
    
    def getRandomAiImage(self):
        try:
            imageBytes = requests.get("https://fette-katze.de/cat", timeout=30).content
        except Exception:
            raise BaseException(message="Failed to get Image from https://fette-katze.de/cat")  
        try:
            array = np.frombuffer(imageBytes, np.uint8)
            img = cv2.imdecode(array, cv2.IMREAD_UNCHANGED)
        except Exception:
            raise BaseException(message="Failed to convert response from https://fette-katze.de/cat to OpneCV image")
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

