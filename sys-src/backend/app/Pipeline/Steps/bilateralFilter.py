import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError


class BilateralFilter(BaseStep):
    def __call__(self, img, parameters):
        # TODO: add error handling and check which parameters we need
        return img

    def describe(self):
        return {
            "title": "Bilateral Filter",
            "info": "Reduce Noise using a Bilateral Filter",
            "params": [
                {
                    "title": "Neighborhood Diameter",
                    "info": "Diameter of each pixel neighborhood used during filtering. Must be greater than 0",
                    "defaultValue": 3,
                    "value": 3,
                },
                {
                    "title": "Sigma Color",
                    "info": "Filter sigma in the color space. Large value means farther colors of neigborhood will be mixed together.",
                    "defaultValue": 0.01,
                    "value": 0.01,
                },
                {
                    "title": "Sigma Space",
                    "info": "Filter sigma in the coordinate space. Large value means farther pixels will influence each other.",
                    "defaultValue": 0.01,
                    "value": 0.01,
                },
            ],
        }
