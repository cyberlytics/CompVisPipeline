import cv2
import numpy as np

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class SaltAndPepperNoise(BaseStep):
    def __call__(self, img, parameters):
        #TODO: add error handling
        try:
            p0 = float(parameters[0])
            p1 = float(parameters[1])

            if p0 < 0: p0 = 0
            elif p0 > 1: p0 = 1

            if p1 < 0: p1 = 0

            out = np.copy(img)

            num_salt = np.ceil(p1*img.size*p0)
            salt_coords = [np.random.randint(0, i-1, int(num_salt)) for i in img.shape]
            out[salt_coords[0], salt_coords[1]] = 255

            num_pepper = np.ceil(p1*img.size*(1.0-p0))
            pepper_coords = [np.random.randint(0, i-1, int(num_pepper)) for i in img.shape]
            out[pepper_coords[0], pepper_coords[1]] = 0

            return out
        except Exception:
            raise ImageProcessingError(message="SaltAndPepperNoise failed to process image")

    def describe(self):
        return {
            "title": "Salt & Pepper Noise",
            "info": "Add Salt & Pepper Noise to Image",
            "params": [
                {"title": "Salt VS Pepper",
                 "info": "Ratio between 'Salt' and 'Pepper' pixels. Number between 0 and 1, where 1 means only 'Salt' and 0 means only 'Pepper'.",
                 "defaultValue": 0.5},
                 {"title": "Noise Strength",
                  "info": "Amount of noise to be added to the image. Must be a positive number.",
                  "defaultValue": 0.05},
            ],
        }