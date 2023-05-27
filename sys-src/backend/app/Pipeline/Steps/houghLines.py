import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class HoughLines(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement hough lines
        pass

    def describe(self):
        return {
            "title": "Hough Lines",
            "info": "Finds lines in an image using Hough transform.",
            "params": [
                {
                    "title": "Rho",
                    "info": "Distance resolution of the accumulator in pixels.",
                    "defaultValue": 1
                },
                {
                    "title": "Theta",
                    "info": "Angle resolution of the accumulator in radians.",
                    "defaultValue": 1
                },
                {
                    "title": "Threshold",
                    "info": "Threshold value for lines.",
                    "defaultValue": 100
                },
            ],
        }