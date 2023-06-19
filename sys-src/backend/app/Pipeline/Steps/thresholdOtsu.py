import cv2 

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import WrongParameterError, ImageProcessingError


class ThresholdOtsu(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = parameters[0]

            if len(img.shape) not in (2, 3): raise WrongParameterError("[Threshold Otsu] Invalid image shape!")
            if type(p0) is not bool: raise WrongParameterError(message="[Threshold Otsu] Invert flag must be a bool!")

            if p0:
                invert = cv2.THRESH_BINARY_INV
            else:
                invert = cv2.THRESH_BINARY
            
            return cv2.threshold(img, 0, 255, invert+cv2.THRESH_OTSU)[1]

        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[Threshold Otsu] {e}")
        except NameError as e:
            raise WrongParameterError(message=f"[Threshold Otsu] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[Threshold Otsu] {e}")


    def describe(self):
        return {
            "title": "Otsu Threshold",
            "info": "Segment an image by calculating the threshold value automatically.",
            "params": [
                {
                    "title": "Invert Threshold",
                    "info": "Inverts the binary image that is created by thresholding.",
                    "defaultValue": False,
                    "value": False,
                },
            ],
        }
