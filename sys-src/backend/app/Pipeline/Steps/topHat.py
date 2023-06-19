import cv2
from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class TopHat(BaseStep):
    def _get_kernel(self, shape, kernel_width, kernel_height):
        if shape == 0:
            return cv2.getStructuringElement(
                cv2.MORPH_RECT, (kernel_height, kernel_width)
            )
        elif shape == 1:
            return cv2.getStructuringElement(
                cv2.MORPH_CROSS, (kernel_height, kernel_width)
            )
        elif shape == 2:
            return cv2.getStructuringElement(
                cv2.MORPH_ELLIPSE, (kernel_height, kernel_width)
            )

    def __call__(self, img, parameters):
        try:
            kernel_shape, kernel_width, kernel_height, iterations = map(int, parameters)

            if len(img.shape) != 2:
                raise WrongParameterError(message="[Top Hat] Image has to be grayscale!")
            if kernel_shape not in {0, 1, 2}: 
                    raise WrongParameterError(message="[Top Hat] Invalid kernel shape.")
            if kernel_width < 2: 
                raise WrongParameterError(message="[Top Hat] Kernel width must be bigger than 1.")
            if kernel_height < 2: 
                raise WrongParameterError(message="[Top Hat] Kernel height must be bigger than 1.")
            if iterations < 1: 
                raise WrongParameterError(message="[Top Hat] Iterations must be bigger than 0.")

            kernel = self._get_kernel(kernel_shape, kernel_width, kernel_height)
            return cv2.morphologyEx(img, cv2.MORPH_TOPHAT, kernel)
        except WrongParameterError as e:
            raise e
        except Exception as e:
            raise ImageProcessingError(message=f"[Top Hat] {e}")

    def describe(self):
        return {
            "title": "White Top Hat Transformation",
            "info": "Perform white top hat transformation on an image.",
            "params": [
                {
                    "title": "Kernel Shape",
                    "info": "Determines shape of structuring element. 0 means rectangle, 1 means cross and 2 means ellipse.",
                    "defaultValue": 0,
                    "value": 0,
                },
                {
                    "title": "Kernel Width",
                    "info": "Width of structuring element. Must be bigger than 1.",
                    "defaultValue": 3,
                    "value": 3,
                },
                {
                    "title": "Kernel Height",
                    "info": "Height of structuring element. Must be bigger than 1.",
                    "defaultValue": 3,
                    "value": 3,
                },
                {
                    "title": "Iterations",
                    "info": "Number of times the transformation is performed. Must be bigger than 0.",
                    "defaultValue": 1,
                    "value": 1,
                },
            ],
        }
