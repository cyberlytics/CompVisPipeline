from skimage import measure
import cv2
import numpy as np

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class ConnectedComponents(BaseStep):
    def __call__(self, img, parameters):
        try:
            if len(img.shape) != 2:
                raise WrongParameterError(message="[Connected Components] Invalid Image Shape! Image has to be binary!")
            if set(np.unique(img)) != {0,1}:
                raise WrongParameterError(message="[Connected Components] Image has to be binary!")
            p0 = parameters[0]
            if p0 not in {4, 8}:
                raise WrongParameterError(message="[Connected Components] Invalid Neighbor connectivity! Must be either 4 or 8!")
            _, labels_img = cv2.connectedComponents(img, connectivity=p0)
            return labels_img
            
        except WrongParameterError as e:
            raise e
        except Exception as e:
            raise ImageProcessingError(message=f"[Connected Components] {e}")

    def describe(self):
        return {
            "title": "Connected Components",
            "info": "Computes connected components image of an image.",
            "params": [
                {
                    "title": "Connectivity",
                    "info": "Neighbor connectivity used for computing connected components. Must be either 4 or 8.",
                    "defaultValue": 4,
                    "value": 4,
                },
            ],
        }
