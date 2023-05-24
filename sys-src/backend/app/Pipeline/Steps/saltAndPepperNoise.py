import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class SaltAndPepperNoise(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement Salt & Pepper Noise
        pass

    def describe(self):
        return {
            "title": "Salt & Pepper Noise",
            "info": "Add Salt & Pepper Noise to Image",
            "params": [
                {"title": "Salt VS Pepper",
                 "info": "Ration between 'Salt' and 'Pepper' pixels. Number between 0 and 1, where 1 means only 'Salt' and 0 means only 'Pepper'.",
                 "defaultValue": 0.5},
                 {"title": "Noise Strength",
                  "info": "Amount of noise to be added to the image. Must be a positive number.",
                  "defaultValue": 0.05},
            ],
        }