import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class MedianFilter(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement median filter
        pass

    def describe(self):
        return {
            "title": "Median Filter",
            "info": "Reduce noise using a median filter.",
            "params": [
                {
                    "title": "Kernel Size",
                    "info": "Must be a odd number greater than 1",
                    "defaultValue":3
                }
            ],
        }