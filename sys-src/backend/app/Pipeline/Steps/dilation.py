import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class Dilation(BaseStep):
    def __get_kernel(self, shape, kernel_width, kernel_height):
        if shape == 0:
            return cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_height, kernel_width))
        elif shape == 1:
            return cv2.getStructuringElement(cv2.MORPH_CROSS, (kernel_height, kernel_width))
        elif shape == 2:
            return cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (kernel_height, kernel_width))


    def __call__(self, img, parameters):
        try:
            params = [int(param) for param in parameters]
            kernel = self.__get_kernel(params[0], params[1], params[2])
            return cv2.dilate(img, kernel, iterations = params[3])
        except Exception:
            raise ImageProcessingError(message="Dilation failed to process image")

    def describe(self):
        return {
            "title": "Dilation",
            "info": "Dilates image using a specific structuring element.",
            "params": [
                {
                    "title": "Kernel Shape",
                    "info": "Determines shape of structuring element. 0 means rectangle, 1 means cross and 2 means ellipse.",
                    "defaultValue": 0
                },
                {
                    "title": "Kernel Width",
                    "info": "Width of structuring element. Must be bigger than 1.",
                    "defaultValue": 3
                },
                {
                    "title": "Kernel Height",
                    "info": "Height of structuring element. Must be bigger than 1.",
                    "defaultValue": 3
                },
                {
                    "title": "Iterations",
                    "info": "Number of times that an image is dilated. Must be bigger than 0.",
                    "defaultValue": 1
                },
            ],
        }