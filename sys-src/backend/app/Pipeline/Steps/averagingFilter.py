import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class AveragingFilter(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement averaging filter
        pass

    def describe(self):
        return {
            "title": "Averaging Filter",
            "info": "Reduce noise using an averaging filter.",
            "params": [
                {
                    "title":"Kernel Width",
                    "info":"Width of kernel used for averaging. Must be bigger than 0",
                    "defaultValue":3
                },
                {
                    "title":"Kernel Height",
                    "info":"Height of kernel used for averaging. Must be bigger than 0",
                    "defaultValue":3
                },
            ],
        }