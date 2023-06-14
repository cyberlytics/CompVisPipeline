from app.Pipeline.Steps.baseStep import BaseStep


class ThresholdMultiOtsu(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement multi otsu threshold
        return img

    def describe(self):
        return {
            "title": "Multi-Otsu Threshold",
            "info": "Segment image by calculating multiple threshold values automatically.",
            "params": [
                {
                    "title": "Regions",
                    "info": "Number of regions into which the image should be segmented. Must be bigger than 1",
                    "defaultValue": 2,
                    "value": 2,
                }
            ],
        }
