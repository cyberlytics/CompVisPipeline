import io
import cv2
import numpy as np
from uuid import uuid4
from matplotlib import pyplot as plt
from app.connections.aws_s3 import S3Manager


class MetadataError(Exception):
    def __init__(self, message):
        self.message = message


class Metadata:
    def __init__(self, imageId, s3Manager=None):
        self.imageId = imageId
        self.s3Manager = s3Manager or S3Manager()

    def getMetadata(self):

        response_metadata, image = self.s3Manager.getImageFromS3(self.imageId)
        if response_metadata["HTTPStatusCode"] != 200:
            raise MetadataError(message="failed to load image from s3 bucket")
        
        if len(image.shape) == 2:
            height, width= image.shape 
            channels = 1
        elif len(image.shape) == 3:
            height, width, channels = image.shape 
        else:
            raise MetadataError(message="Unknown shape of image")

        if channels == 1:
            colors = ("tab:grey",)
            legend = ["gray channel"]
        elif channels == 3:
            colors = ('b','g','r')
            legend = ["blue channel", "green channel", "red channel"]
        else:
            raise MetadataError(message="Unkonwn colorspace: Could not plot histogram")

        fig, _ = plt.subplots()
        for i,color in enumerate(colors):
            hist = cv2.calcHist([image],[i],None,[256],[0,256])
            plt.plot(hist,color = color)     
        plt.legend(legend)
        plt.xlabel("Intensity")
        plt.ylabel("Frequency")
        buffer = io.BytesIO()
        fig.savefig(buffer)

        buffer.seek(0)
        hist_png = buffer.getvalue()
        buffer.close()
        hist_np_array = np.frombuffer(hist_png, np.uint8)
        hist_bgr = cv2.imdecode(hist_np_array, cv2.IMREAD_UNCHANGED)
        hist_bgr = cv2.cvtColor(hist_bgr, cv2.COLOR_RGB2BGR)

        histId = str(uuid4())
        response_metadata = self.s3Manager.pushImageToS3(histId, hist_bgr)
        if response_metadata["HTTPStatusCode"] != 200:
            raise MetadataError(message="failed to save histogram to s3 bucket")

        return (histId, height, width, channels)
    