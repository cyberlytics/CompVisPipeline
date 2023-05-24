import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class Rotate(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement image rotation
        pass

    def describe(self):
        return {
            "title": "Rotate Image",
            "info": "Rotate image by 90, 180 or 270 degrees.",
            "params": [
                {
                    "title":"Rotation",
                    "info": "Amount to rotate the image by. 0 means 90, 1 means 180 and 2 means 270 degrees clockwise.",
                    "defaultValue": 0
                }
            ],
        }