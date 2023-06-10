from app.Pipeline.Steps.baseStep import BaseStep


class HoughLines(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement hough lines
        return img

    def describe(self):
        return {
            "title": "Hough Lines",
            "info": "Finds lines in an image using Hough transform.",
            "params": [
                {
                    "title": "Rho",
                    "info": "Distance resolution of the accumulator in pixels.",
                    "defaultValue": 1,
                    "value": 1,
                },
                {
                    "title": "Theta",
                    "info": "Angle resolution of the accumulator in radians.",
                    "defaultValue": 1,
                    "value": 1,
                },
                {
                    "title": "Threshold",
                    "info": "Threshold value for lines.",
                    "defaultValue": 100,
                    "value": 100,
                },
            ],
        }
