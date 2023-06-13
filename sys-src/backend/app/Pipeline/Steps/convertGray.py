import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class ConvertGray(BaseStep):
    def __call__(self, img, parameters):
        try:
            if len(img.shape) != 3: raise WrongParameterError(message="Invalid image shape!")

            return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        except WrongParameterError as e:
            raise e
        except Exception as e:
            raise ImageProcessingError(message=e)

    def describe(self):
        return {
            "title": "Convert to Graysclae",
            "info": "Change color space of an image to grayscale.",
            "params": [],
        }
