import cv2

from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError

class NonLocalMeansFilter(BaseStep):
    def __call__(self, img, parameters):
        #TODO: implement non local means filter
        pass

    def describe(self):
        return {
            "title": "Non Local Means Filter",
            "info": "Reduce noise using non local means denoising algorithm.",
            "params": [
                {
                    "title": "Filter Strength",
                    "info": "Strength of filter used inside the window. Large value perfectly removes noise but also removes details.",
                    "defaultValue": 3
                },
                {
                    "title": "Template Window Size",
                    "info": "Size of template window used to compute weights. Should be an odd number.",
                    "defaultValue": 7
                },
                {
                    "title": "Search Window Size",
                    "info": "Size of window used to compute weighted average for given pixel. Should be an odd number.",
                    "defaultValue": 21
                },
            ],
        }