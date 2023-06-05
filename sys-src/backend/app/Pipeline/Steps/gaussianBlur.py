import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError


class GaussianBlur(BaseStep):
    def __call__(img, parameters):
        # TODO: add Error handling and check which parameters we need
        try:
            p0 = int(parameters[0])
            ...  # TODO: cast parameters to correct type all parameters is a list of str
            return cv2.GaussianBlur(img, p0)
        except Exception:
            raise ImageProcessingError(message="GaussianBlur failed to process image")

    def describe(self):
        # TODO: describe this
        return {
            "title": "Gaussian Blur",
            "info": "Reduce Noise using a Gaussian Blur",
            "params": [
                {
                    "title": "Kernel Width",
                    "info": "Width of kernel used for gaussian blur. Must be bigger than 0",
                    "defaultValue": 3,
                    "value": 3,
                },
                {
                    "title": "Kernel Height",
                    "info": "Height of kernel used for gaussian blur. Must be bigger than 0",
                    "defaultValue": 3,
                    "value": 3,
                },
                {
                    "title": "Sigma X",
                    "info": "Standard deviation of gaussian kernel in X direction",
                    "defaultValue": 0,
                    "value": 0,
                },
                {
                    "title": "Sigma Y",
                    "info": "Standard deviation of gaussian kernel in Y direction",
                    "defaultValue": 0,
                    "value": 0,
                },
            ],
        }
