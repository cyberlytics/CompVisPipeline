import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class ConnectedComponents(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement connected components
        pass

    def describe(self):
        return {
            "title": "Connected Components",
            "info": "Computes connected components image of an image.",
            "params": [
                {
                    "title": "Connectivity",
                    "info": "Neighbor connectivity used for computing connected components. Must be either 4 or 8.",
                    "defaultValue": 4
                },
            ],
        }