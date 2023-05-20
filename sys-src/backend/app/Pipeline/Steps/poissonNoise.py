import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class PoissonNoise(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement Poisson Noise
        pass

    def describe(self):
        return {
            "title": "Poisson Noise",
            "info": "Add Poisson Noise to Image",
            "params": [],
        }