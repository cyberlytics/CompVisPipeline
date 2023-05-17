import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError


class GaussianBlur(BaseStep):
    def __call__(img, parameters):
        # TODO: add Error handling and check which parameters we need
        try:
            p0 = int(parameters[0])
            ... # TODO: cast parameters to correct type all parameters is a list of str
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
                    "title": "parameter 1",
                    "info": "param info",
                    "defaultValue": 3
                },
                {
                    "title": "parameter 2",
                    "info": "param info",
                    "defaultValue": 0.01
                },
                {
                    "title": "parameter 3",
                    "info": "param info",
                    "defaultValue": "red"
                }
            ]
        }
