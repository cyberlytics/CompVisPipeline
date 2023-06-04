import cv2
import numpy as np

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError, WrongParameterError

class GaussianNoise(BaseStep):
    def __call__(self, img, parameters):
        #TODO: add error handling
        try:
            p0 = float(parameters[0])
            
            if p0 < 0: raise WrongParameterError(message="Noise strength should not be negative!")

            gauss = np.random.normal(0, p0, img.shape)
            if len(img.shape) > 2:
                gauss = gauss.reshape(img.shape[0], img.shape[1], img.shape[2]).astype("uint8")
            else:
                gauss = gauss.reshape(img.shape[0], img.shape[1]).astype("uint8")

            return cv2.add(img.astype("uint8"), gauss)
        except Exception as e:
            raise ImageProcessingError(message=e)

    def describe(self):
        return {
            "title": "Gaussian Noise",
            "info": "Add Gaussian Noise to Image",
            "params": [
                {"title": "Noise Strength", 
                 "info": "Variance which determines the amount of noise to be added into the image. Must be a positive number.", 
                 "defaultValue": 1,
                 "value": 1
                },
            ],
        }