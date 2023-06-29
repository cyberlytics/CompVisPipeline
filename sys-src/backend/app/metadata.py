import io
from app.exceptions import MetadataError
import cv2
import numpy as np
from uuid import uuid4
from matplotlib import pyplot as plt
from app.connections.aws_s3 import S3Manager


class Metadata:
    def __init__(self, s3Manager=None):
        self.s3Manager = s3Manager or S3Manager()

    def getMetadata(self, image):
        if len(image.shape) == 2:
            height, width = image.shape
            channels = 1
        elif len(image.shape) == 3:
            height, width, channels = image.shape
        else:
            raise MetadataError(message="Unknown shape of image")

        if channels == 1:
            colors = ("tab:grey",)
            legend = ["gray channel"]
        elif channels == 3:
            colors = ("b", "g", "r")
            legend = ["blue channel", "green channel", "red channel"]
        elif channels == 4:
            colors = ("b", "g", "r", "darkgray")
            legend = ["blue channel", "green channel", "red channel", "alpha channel"]
        else:
            raise MetadataError(message=f"Unkonwn colorspace: Could not plot histogram. Number of channels = {channels}")

        fig, _ = plt.subplots(figsize=(8, 6))
        plt.xticks(fontsize = 12)
        plt.yticks(fontsize = 12)
        if channels > 1:
            for i, color in enumerate(colors):
                hist, _ = np.histogram(image[:,:,i], range=(0, image.max()), bins=image.max()+1)
                plt.plot(hist, color=color)
        else:
            hist, _ = np.histogram(image, range=(0, image.max()), bins=image.max() + 1)
            plt.plot(hist, color=colors[0])
        plt.legend(legend)
        plt.xlabel("Intensity", fontsize=18)
        plt.ylabel("Frequency", fontsize=18)
        buffer = io.BytesIO()
        fig.savefig(buffer)

        buffer.seek(0)
        hist_png = buffer.getvalue()
        buffer.close()
        hist_np_array = np.frombuffer(hist_png, np.uint8)
        hist_bgr = cv2.imdecode(hist_np_array, cv2.IMREAD_UNCHANGED)

        histId = str(uuid4()) + ".jpeg"
        self.s3Manager.pushImageToS3(histId, hist_bgr)

        return (histId, height, width, channels)
