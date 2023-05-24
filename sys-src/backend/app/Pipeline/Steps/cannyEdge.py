import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class CannyEdge(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement canny edge detector.
        pass

    def describe(self):
        return {
            "title": "Canny Edge Detector",
            "info": "Find edges using the canny algorithm.",
            "params": [
                {
                    "title": "First threshold",
                    "info": "First threshold value for hysteresis thresholding.",
                    "defaultValue": 100
                },
                {
                    "title": "Second threshold",
                    "info": "Second threshold value for hysteresis thresholding.",
                    "defaultValue": 200
                },
            ],
        }