import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class Flip(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = int(parameters[0])

            if len(img.shape) not in (2, 3): raise WrongParameterError("[Flip] Invalid image shape!")

            return cv2.flip(img, p0)
        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[Flip] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[Flip] {e}")

    def describe(self):
        return {
            "title": "Flip Image",
            "info": "Flip image vertically or horizontally or both.",
            "params": [
                {
                    "title": "Axis",
                    "info": "Axis on which the image is flipped. 0 means vertical, positive numbers mean horizontal, negative numbers mean both.",
                    "defaultValue": 0,
                    "value": 0,
                },
            ],
        }
