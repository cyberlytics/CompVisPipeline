import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class HoughCircle(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement hough circles.
        pass

    def describe(self):
        return {
            "title": "Hough Circles",
            "info": "Find circles in an image using Hough transform",
            "params": [
                {
                    "title": "Minimum Distance",
                    "info": "Minimum distance between the centers of the detected circles.",
                    "defaultValue": 20,
                    "value": 20
                },
                {
                    "title": "First method-specific Parameter",
                    "info": "Threshold value for the canny edge detector.",
                    "defaultValue": 10,
                    "value": 10
                },
                {
                    "title": "Second method-specific Parameter",
                    "info": "Accumulator threshold for the circle centers at the detection stage.",
                    "defaultValue": 20,
                    "value": 20
                },
            ]
        }