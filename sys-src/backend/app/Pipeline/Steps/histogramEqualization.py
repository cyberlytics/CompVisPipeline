import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class HistogramEqualization(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement histogram equalization
        pass

    def describe(self):
        return {
            "title": "Histogram Equalization",
            "info": "Equalize histogram of a grayscale image. If image is not already a grayscale image, it will be converted first.",
            "params": [],
        }