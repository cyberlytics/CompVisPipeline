import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class HistogramEqualization(BaseStep):
    def __call__(self, img, parameters):
        try:
            if len(img.shape) != 2:
                raise WrongParameterError("[Histogram Equalization] Image has to be grayscale")
            return cv2.equalizeHist(img)
        except WrongParameterError as e:
            raise e
        except Exception as e:
            raise ImageProcessingError(message=f"[Histogram Equalization] {e}")


    def describe(self):
        return {
            "title": "Histogram Equalization",
            "info": "Equalize histogram of a grayscale image.",
            "params": [],
        }
