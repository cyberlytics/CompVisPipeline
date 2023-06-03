import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class LogTransform(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement log transformation
        pass
    
    def describe(self):
        return {
            "title": "Logarithmic Transformation",
            "info": "Perform logarithmic correction on an image.",
            "params": [
                {
                    "title": "Gain",
                    "info": "Constant which determines strength of transformation.",
                    "defaultValue": 1,
                    "value": 1
                },
                {
                    "title": "Inverse Transformation",
                    "info": "Perform inverse logarithmic correction.",
                    "defaultValue": False,
                    "value": False
                },
            ],
        }