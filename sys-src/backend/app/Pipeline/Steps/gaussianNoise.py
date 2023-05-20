import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class GaussianNoise(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement Gaussian Noise
        pass

    def describe(self):
        return {
            "title": "Gaussian Noise",
            "info": "Add Gaussian Noise to Image",
            "params": [
                {"title": "Noise Strength", 
                 "info": "Variance which determines the amount of noise to be added into the image. Must be a positive number.", 
                 "defaultValue": 1},
            ],
        }