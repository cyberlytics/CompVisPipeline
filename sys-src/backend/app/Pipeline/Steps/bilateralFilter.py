import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError


class BilateralFilter(BaseStep):
    def __call__(self, img, parameters):
        # TODO: add error handling and check which parameters we need
        try:
            return cv2.bilateralFilter(img, parameters)
        except Exception:
            raise ImageProcessingError(
                message="BilateralFilter failed to process image"
            )
