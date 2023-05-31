import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError


class AveragingFilter(BaseStep):
    def __call__(self, img, parameters):
        try:
            params = [int(param) for param in parameters]
            kernel_width = params[0]
            kernel_height = params[1]

            if kernel_height < 0 or kernel_width < 0:
                return img

            return cv2.blur(img, (kernel_width, kernel_height))


        except:
            print("Ein unerwarteter Fehler ist aufgetreten. Filter: AveragingFilter")

    def describe(self):
        return {
            "title": "Averaging Filter",
            "info": "Reduce noise using an averaging filter.",
            "params": [
                {
                    "title": "Kernel Width",
                    "info": "Width of kernel used for averaging. Must be bigger than 0",
                    "defaultValue": 3
                },
                {
                    "title": "Kernel Height",
                    "info": "Height of kernel used for averaging. Must be bigger than 0",
                    "defaultValue": 3
                },
            ],
        }
