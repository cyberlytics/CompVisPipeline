from skimage.exposure import adjust_gamma
import numpy as np

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError

class GammaTransform(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = float(parameters[0])
            p1 = float(parameters[1])

            if len(img.shape) not in (2, 3): raise WrongParameterError("[Gamma Transformation] Invalid image shape!")
            if img.dtype != np.uint8: raise WrongParameterError("[Gamma Transformation] Invalid data type of image! Convert image to 'uint8'!")
            if p0 < 0: raise WrongParameterError("[Gamma Transformation] Gamma-Value can't be negative!")

            return adjust_gamma(img, p0, p1)
        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[Gamma Transformation] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[Gamma Transformation] {e}")

    def describe(self):
        return {
            "title": "Gamma Transformation",
            "info": "Perform gamma correction on an image.",
            "params": [
                {
                    "title": "Gamma",
                    "info": "Gamma-Value used for transformation. Must be positive number.",
                    "defaultValue": 1,
                    "value": 1,
                },
                {
                    "title": "Gain",
                    "info": "Constant which determines strength of transformation.",
                    "defaultValue": 1,
                    "value": 1,
                },
            ],
        }
