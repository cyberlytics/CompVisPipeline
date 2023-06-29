import numpy as np
from skimage.segmentation import random_walker

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class RandomWalker(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = float(parameters[0])

            if len(img.shape) != 2: raise WrongParameterError("[RandomWalker] Invalid image shape! The image for segmentation needs to have one color channel (e.g. binary/grayscale image)!")
            if p0 <= 0: raise WrongParameterError("[RandomWalker] Threshold value must be larger than zero!")

            markers = np.zeros(img.shape, dtype=np.uint8)
            markers[img < np.min(img)+p0] = 1
            markers[img > np.max(img)-p0] = 2

            return random_walker(img, markers, mode='bf')
        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[RandomWalker] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[RandomWalker] {e}")

    def describe(self):
        return {
            "title": "Random Walker Segmentation",
            "info": "Segment image using the random walker algorithm.",
            "params": [
                {
                    "title": "Threshold Value",
                    "info": "Value which is used to compare each pixel and segment the image. Must be positive.",
                    "defaultValue": 100,
                    "value": 100
                }
            ],
        }