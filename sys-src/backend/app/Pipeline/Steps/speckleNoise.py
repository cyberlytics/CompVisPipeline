import cv2
import numpy as np

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class SpeckleNoise(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = float(parameters[0])

            if len(img.shape) not in (2, 3): raise WrongParameterError("[Speckle Noise] Invalid image shape!")

            if p0 < 0:
                raise WrongParameterError(
                    message="[Speckle Noise] Noise strength should not be negative!"
                )

            gauss = np.random.normal(0, p0, img.shape)

            if len(img.shape) > 2:
                gauss = gauss.reshape(img.shape[0], img.shape[1], img.shape[2]).astype(
                    "uint8"
                )
            else:
                gauss = gauss.reshape(img.shape[0], img.shape[1]).astype("uint8")

            return cv2.add(img, img * gauss)
        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[Speckle Noise] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[Speckle Noise] {e}")

    def describe(self):
        return {
            "title": "Speckle Noise",
            "info": "Add Speckle Noise to Image",
            "params": [
                {
                    "title": "Noise Strength",
                    "info": "Variance which determines the amount of noise to be added into the image. Must be a positive number.",
                    "defaultValue": 1,
                    "value": 1,
                },
            ],
        }
