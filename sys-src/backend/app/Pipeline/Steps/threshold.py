import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class Thershold(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement threshold
        pass

    def describe(self):
        return {
            "title": "Threshold",
            "info": "Segment image using a specific threshold value",
            "params": [
                {
                    "title": "Threshold Value",
                    "info": "Value which is used to compare each pixel and segment the image. Must be positive.",
                    "defaultValue": 100
                },
                {
                    "title": "Invert Threshold",
                    "info": "Inverts the binary image that is created by thresholding.",
                    "defaultValue": False
                },
            ],
        }