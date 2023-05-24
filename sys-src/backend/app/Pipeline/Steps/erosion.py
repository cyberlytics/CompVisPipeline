import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class Erosion(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement erosion.
        pass

    def describe(self):
        return {
            "title": "Erosion",
            "info": "Erodes image using a specific structuring element.",
            "params": [
                {
                    "title": "Kernel Shape",
                    "info": "Determines shape of structuring element. 0 means rectangle, 1 means cross and 2 means ellipse.",
                    "defaultValue": 0
                },
                {
                    "title": "Kernel Width",
                    "info": "Width of structuring element. Must be bigger than 1.",
                    "defaultValue": 3
                },
                {
                    "title": "Kernel Height",
                    "info": "Height of structuring element. Must be bigger than 1.",
                    "defaultValue": 3
                },
                {
                    "title": "Iterations",
                    "info": "Number of times that an image is eroded. Must be bigger than 0.",
                    "defaultValue": 1
                },
            ],
        }