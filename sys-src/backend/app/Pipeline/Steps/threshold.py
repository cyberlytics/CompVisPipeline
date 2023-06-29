import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class Thershold(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = int(parameters[0])
            p1 = parameters[1]

            if len(img.shape) not in (2, 3): raise WrongParameterError("[Threshold] Invalid image shape!")
            if p0 < 0: raise WrongParameterError(message="[Threshold] Threshold value must be positive!")
            if type(p1) is not bool: raise WrongParameterError(message="[Threshold] Invert flag must be a bool!")

            if p1:
                invert = cv2.THRESH_BINARY_INV
            else:
                invert = cv2.THRESH_BINARY

            return cv2.threshold(img, p0, 255, invert)[1]    
        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[Threshold] {e}")
        except NameError as e:
            raise WrongParameterError(message=f"[Threshold] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[Threshold] {e}")

    def describe(self):
        return {
            "title": "Threshold",
            "info": "Segment image using a specific threshold value",
            "params": [
                {
                    "title": "Threshold Value",
                    "info": "Value which is used to compare each pixel and segment the image. Must be positive.",
                    "defaultValue": 100,
                    "value": 100,
                },
                {
                    "title": "Invert Threshold",
                    "info": "Inverts the binary image that is created by thresholding.",
                    "defaultValue": False,
                    "value": False,
                },
            ],
        }
