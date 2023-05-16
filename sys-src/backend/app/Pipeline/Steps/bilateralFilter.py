import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError


class BilateralFilter(BaseStep):
    def __call__(self, img, parameters):
        # TODO: add error handling and check which parameters we need
        try:
            p0 = int(parameters[0])
            ... # TODO: cast parameters to correct type all parameters is a list of str
            return cv2.bilateralFilter(img, p0)
        except Exception:
            raise ImageProcessingError(
                message="BilateralFilter failed to process image"
            )
