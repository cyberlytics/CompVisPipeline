import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError


class Erosion(BaseStep):
    def __validate_kernel_shape(self, shape):
        return shape == 1 or shape == 2 or shape == 3

    def __validate_kernel_size(self, size):
        return size > 1

    def __validate_iterations(self, iterations):
        return iterations > 0

    def __get_kernel(self, shape, kernel_width, kernel_height):
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
            params = [int(param) for param in parameters]

            # If kernel shape not valid, set to default
            kernel_shape = params[0] if self.__validate_kernel_shape(params[0]) else 0

            # If kernel size not valid, set to default
            kernel_width = params[1] if self.__validate_kernel_size(params[1]) else 3
            kernel_height = params[2] if self.__validate_kernel_size(params[2]) else 3

            # If iterations not valid, set to default
            iterations = params[3] if self.__validate_iterations(params[3]) else 1

            kernel = self.__get_kernel(kernel_shape, kernel_width, kernel_height)
            return cv2.erode(img, kernel, iterations=iterations)
        except Exception:
            raise ImageProcessingError(message="Erosion failed to process image")

    def describe(self):
        return {
            "title": "Erosion",
            "info": "Erodes image using a specific structuring element.",
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
                    "info": "Number of times that an image is eroded. Must be bigger than 0.",
                    "defaultValue": 1,
                    "value": 1,
                },
            ],
        }
