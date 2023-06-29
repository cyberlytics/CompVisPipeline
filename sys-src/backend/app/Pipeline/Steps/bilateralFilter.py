import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class BilateralFilter(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = int(parameters[0])
            p1 = float(parameters[1])
            p2 = float(parameters[2])

            if len(img.shape) not in (2, 3): raise WrongParameterError(message="[Bilateral Filter] Invalid image shape!")
            if p0 < 1: raise WrongParameterError(message="[Bilateral Filter] Diameter can't be less than one!")

            return cv2.bilateralFilter(img, p0, p1, p2)
        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[Bilateral Filter]  {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[Bilateral Filter] {e}")

    def describe(self):
        return {
            "title": "Bilateral Filter",
            "info": "Reduce Noise using a Bilateral Filter",
            "params": [
                {
                    "title": "Neighborhood Diameter",
                    "info": "Diameter of each pixel neighborhood used during filtering. Must be greater than 0",
                    "defaultValue": 3,
                    "value": 3,
                },
                {
                    "title": "Sigma Color",
                    "info": "Filter sigma in the color space. Large value means farther colors of neigborhood will be mixed together.",
                    "defaultValue": 0.01,
                    "value": 0.01,
                },
                {
                    "title": "Sigma Space",
                    "info": "Filter sigma in the coordinate space. Large value means farther pixels will influence each other.",
                    "defaultValue": 0.01,
                    "value": 0.01,
                },
            ],
        }
