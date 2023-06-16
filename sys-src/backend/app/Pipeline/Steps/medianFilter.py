import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class MedianFilter(BaseStep):
    def is_valid_kernel_size(self, kernel_size):
        return kernel_size < 1 or kernel_size % 2 == 0

    def __call__(self, img, parameters):
        try:
            kernel_size = parameters[0]

            if self.is_valid_kernel_size(kernel_size):
                raise WrongParameterError(
                    message="[Median Filter] Kernelsize has to be positive and odd"
                )

            return cv2.medianBlur(img, kernel_size)

        except Exception as e:
            raise ImageProcessingError(
                message="[Median Filter] An Exception in median filter occured: " + str(e)
            )

    def describe(self):
        return {
            "title": "Median Filter",
            "info": "Reduce noise using a median filter.",
            "params": [
                {
                    "title": "Kernel Size",
                    "info": "Must be a odd number greater than 1",
                    "defaultValue": 3,
                    "value": 3,
                }
            ],
        }
