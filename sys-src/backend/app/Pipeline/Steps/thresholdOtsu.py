from app.Pipeline.Steps.baseStep import BaseStep


class ThresholdOtsu(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement otsu threshold
        pass

    def describe(self):
        return {
            "title": "Otsu Threshold",
            "info": "Segment an image by calculating the threshold value automatically.",
            "params": [
                {
                    "title": "Invert Threshold",
                    "info": "Inverts the binary image that is created by thresholding.",
                    "defaultValue": False,
                    "value": False,
                },
            ],
        }
