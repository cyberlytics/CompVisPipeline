import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class Flip(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement flip
        pass

    def describe(self):
        return {
            "title": "Flip Image",
            "info": "Flip image vertically or horizontally or both.",
            "params": [
                {
                    "title": "Axis",
                    "info:": "Axis on which the image is flipped. 0 means vertical, positive numbers mean horizontal, negative numbers mean both.",
                    "defaultValue": 0
                },
            ],
        }