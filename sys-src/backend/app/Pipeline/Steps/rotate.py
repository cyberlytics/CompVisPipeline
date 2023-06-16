import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError

class Rotate(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = int(parameters[0])

            if p0 not in (0, 1, 2): raise WrongParameterError("[Rotate] Invalid rotation!")
            if len(img.shape) not in (2, 3): raise WrongParameterError("[Rotate] Invalid image shape!")

            return cv2.rotate(img, p0)
        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[Rotate] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[Rotate] {e}")

    def describe(self):
        return {
            "title": "Rotate Image",
            "info": "Rotate image by 90, 180 or 270 degrees.",
            "params": [
                {
                    "title": "Rotation",
                    "info": "Amount to rotate the image by. 0 means 90, 1 means 180 and 2 means 270 degrees clockwise.",
                    "defaultValue": 0,
                    "value": 0,
                }
            ],
        }
