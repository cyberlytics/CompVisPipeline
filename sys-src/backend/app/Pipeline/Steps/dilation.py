import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError

class Dilation(BaseStep):

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
            #Convert parameter
            kernel_shape, kernel_width, kernel_height, iterations = map(int, parameters)

            #Check if parameters are valid
            if len(img.shape) not in (2, 3): 
                raise WrongParameterError(message="[Dilation] Invalid image shape.")
            if kernel_shape not in {0, 1, 2}: 
                raise WrongParameterError(message="[Dilation] Invalid kernel shape.")
            if kernel_width < 2: 
                raise WrongParameterError(message="[Dilation] Kernel width must be bigger than 1.")
            if kernel_height < 2: 
                raise WrongParameterError(message="[Dilation] Kernel height must be bigger than 1.")
            if iterations < 1: 
                raise WrongParameterError(message="[Dilation] Iterations must be bigger than 0.")

            #Process
            kernel = self._get_kernel(kernel_shape, kernel_width, kernel_height)
            return cv2.dilate(img, kernel, iterations=iterations)
        
        except WrongParameterError as e:
            raise e
        
        except ValueError as e:
            raise WrongParameterError(message=f"[Dilation] {e}")

        except Exception as e:
            raise ImageProcessingError(message=f"[Dilation] {e}")

    def describe(self):
        return {
            "title": "Dilation",
            "info": "Dilates image using a specific structuring element.",
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
                    "info": "Number of times that an image is dilated. Must be bigger than 0.",
                    "defaultValue": 1,
                    "value": 1,
                },
            ],
        }
