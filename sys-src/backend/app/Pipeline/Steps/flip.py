import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError


class Flip(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = int(parameters[0])

            if len(img.shape) not in (2, 3): raise ImageProcessingError("Invalid image shape!")

            return cv2.flip(img.astype("uint8"), p0)
        except Exception as e:
            raise ImageProcessingError(message=e)

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
