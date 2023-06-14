from app.Pipeline.Steps.baseStep import BaseStep


class CannyEdge(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement canny edge detector.
        return img

    def describe(self):
        return {
            "title": "Canny Edge Detector",
            "info": "Find edges using the canny algorithm.",
            "params": [
                {
                    "title": "First threshold",
                    "info": "First threshold value for hysteresis thresholding.",
                    "defaultValue": 100,
                    "value": 100,
                },
                {
                    "title": "Second threshold",
                    "info": "Second threshold value for hysteresis thresholding.",
                    "defaultValue": 200,
                    "value": 200,
                },
            ],
        }
