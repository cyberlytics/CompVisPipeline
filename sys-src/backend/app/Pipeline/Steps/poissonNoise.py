import cv2
import numpy as np

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class PoissonNoise(BaseStep):
    def __call__(self, img, parameters):
        #TODO: add error handling
        try:
            vals = len(np.unique(img))
            vals = 2**np.ceil(np.log2(vals))
            return np.random.poisson(img*vals)/float(vals)
        except Exception:
            raise ImageProcessingError(message="PoissonNoise failed to process image")

    def describe(self):
        return {
            "title": "Poisson Noise",
            "info": "Add Poisson Noise to Image",
            "params": [],
        }