import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class Watershed(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement watershed segmentation.
        pass

    def describe(self):
        return {
            "title": "Watershed Segmentation",
            "info": "Segment an image using the watershed algorithm.",
            "params": [],
        }