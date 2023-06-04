import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError, WrongParameterError


class GaussianBlur(BaseStep):
    def __call__(img, parameters):
        try:
            p0 = int(parameters[0])
            p1 = int(parameters[1])
            p2 = float(parameters[2])
            p3 = float(parameters[3])

            if p0 < 1 or p1 < 1: raise WrongParameterError(message="Kernel dimensions can't be negative!")
            if p0 % 2 != 1 or p1 % 2 != 1: raise WrongParameterError(message="Kernel dimensions must be an odd number!")

            return cv2.GaussianBlur(img.astype("uint8"), (p0, p1), p2, p3)
        except Exception as e:
            raise ImageProcessingError(message=e)

    def describe(self):
        # TODO: describe this
        return {
            "title": "Gaussian Blur",
            "info": "Reduce Noise using a Gaussian Blur",
            "params": [
                {
                    "title":"Kernel Width",
                    "info":"Width of kernel used for gaussian blur. Must be bigger than 0 and an odd number",
                    "defaultValue":3,
                    "value":3
                },
                {
                    "title":"Kernel Height",
                    "info":"Height of kernel used for gaussian blur. Must be bigger than 0 and an odd number",
                    "defaultValue":3,
                    "value":3
                },
                {
                    "title": "Sigma X", 
                    "info": "Standard deviation of gaussian kernel in X direction", 
                    "defaultValue": 0,
                    "value": 0
                },
                {
                    "title": "Sigma Y", 
                    "info": "Standard deviation of gaussian kernel in Y direction", 
                    "defaultValue": 0,
                    "value": 0
                },
            ],
        }
