import numpy as np
from scipy import ndimage as ndi
from skimage.segmentation import watershed
from skimage.feature import peak_local_max

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class Watershed(BaseStep):
    def __call__(self, img, parameters):
        try:
            if len(img.shape) != 2: raise WrongParameterError("[Watershed] Invalid image shape! The image for segmentation needs to have one color channel (e.g. binary/grayscale image)!")

            distance = ndi.distance_transform_edt(img)
            local_maxima = peak_local_max(distance, labels=img)

            mask = np.zeros(distance.shape, dtype=bool)
            mask[tuple(local_maxima.T)] = True

            markers = ndi.label(mask)[0]
            return watershed(-distance, markers, mask=img)
        except WrongParameterError as e:
            raise e
        except Exception as e:
            raise ImageProcessingError(message=f"[Watershed] {e}")

    def describe(self):
        return {
            "title": "Watershed Segmentation",
            "info": "Segment an image using the watershed algorithm.",
            "params": [],
        }