import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError


class GaussianBlur(BaseStep):
    def __call__(img, parameters):
        # TODO: add Error handling and check which parameters we need
        try:
            return cv2.GaussianBlur(img, parameters)
        except Exception:
            raise ImageProcessingError(message="GaussianBlur failed to process image")
