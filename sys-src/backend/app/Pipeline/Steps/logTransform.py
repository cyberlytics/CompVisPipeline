from skimage.exposure import adjust_log
import numpy as np

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class LogTransform(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = float(parameters[0])
            p1 = eval(parameters[1])

            if len(img.shape) not in (2, 3): raise WrongParameterError(message="[Log Transformation] Invalid image shape!")
            if img.dtype != np.uint8: raise WrongParameterError(message="[Log Transformation] Invalid data type of image! Convert image to 'uint8'!")
            if type(p1) is not bool: raise WrongParameterError(message="[Log Transformation] Invert flag must be a bool!")

            return adjust_log(img, p0, p1)
        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[Log Transformation] {e}")
        except NameError as e:
            raise WrongParameterError(message=f"[Log Transformation] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[Log Transformation] {e}")

    def describe(self):
        return {
            "title": "Logarithmic Transformation",
            "info": "Perform logarithmic correction on an image.",
            "params": [
                {
                    "title": "Gain",
                    "info": "Constant which determines strength of transformation.",
                    "defaultValue": 1,
                    "value": 1,
                },
                {
                    "title": "Inverse Transformation",
                    "info": "Perform inverse logarithmic correction.",
                    "defaultValue": False,
                    "value": False,
                },
            ],
        }
