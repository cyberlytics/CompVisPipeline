import cv2
from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class NonLocalMeansFilter(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = int(parameters[0])
            p1 = int(parameters[1])
            p2 = int(parameters[2])

            if len(img.shape) not in (2, 3): raise WrongParameterError("[Non Local Means] Invalid image shape!")
            if p0 <= 1: raise WrongParameterError(message="[Non Local Means] Filter strength has to be positiv!")
            if p1 <= 1: raise WrongParameterError(message="[Non Local Means] Template Window Size has to be positiv!")
            if p2 <= 1: raise WrongParameterError(message="[Non Local Means] Search Window Size has to be positiv!")
            if len(img.shape) == 3:
                return cv2.fastNlMeansDenoisingColored(img, None, p0, p0, p1, p2)
            else:
                return cv2.fastNlMeansDenoising(img, None, p0, p1, p2)
            
        except WrongParameterError as e:
            raise e
        except Exception as e:
            raise ImageProcessingError(message=f"[Non Local Means] {e}")

    def describe(self):
        return {
            "title": "Non Local Means Filter",
            "info": "Reduce noise using non local means denoising algorithm.",
            "params": [
                {
                    "title": "Filter Strength",
                    "info": "Strength of filter used inside the window. Large value perfectly removes noise but also removes details.",
                    "defaultValue": 3,
                    "value": 3,
                },
                {
                    "title": "Template Window Size",
                    "info": "Size of template window used to compute weights. Should be an odd number.",
                    "defaultValue": 7,
                    "value": 7,
                },
                {
                    "title": "Search Window Size",
                    "info": "Size of window used to compute weighted average for given pixel. Should be an odd number.",
                    "defaultValue": 21,
                    "value": 21,
                },
            ],
        }
