from skimage.filters import threshold_multiotsu
import numpy as np
from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import WrongParameterError, ImageProcessingError


class ThresholdMultiOtsu(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = int(parameters[0])

            if len(img.shape) not in (2, 3): raise WrongParameterError("[Threshold Multi Otsu] Invalid image shape!")
            if p0 <= 1: raise WrongParameterError(message="[Threshold Multi Otsu] There have to be at least two regions to start!")
            if len(img.shape) == 3 and img.shape[2] != 1: raise WrongParameterError("[Threshold Multi Otsu] Input Image has to be gray-scale!")

            thresholds = threshold_multiotsu(img, p0)

            return np.digitize(img, bins=thresholds)
        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[Threshold Multi Otsu] {e}")
        except NameError as e:
            raise WrongParameterError(message=f"[Threshold Multi Otsu] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[Threshold Multi Otsu] {e}")

    def describe(self):
        return {
            "title": "Multi-Otsu Threshold",
            "info": "Segment image by calculating multiple threshold values automatically.",
            "params": [
                {
                    "title": "Regions",
                    "info": "Number of regions into which the image should be segmented. Must be bigger than 1",
                    "defaultValue": 2,
                    "value": 2,
                }
            ],
        }
