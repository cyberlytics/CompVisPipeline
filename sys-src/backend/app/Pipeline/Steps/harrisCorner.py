from app.Pipeline.Steps.baseStep import BaseStep


class HarrisCorner(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement harris corner detection.
        return img

    def describe(self):
        return {
            "title": "Harris Corner Detection",
            "info": "Perform corner detection.",
            "params": [
                {
                    "title": "Blocksize",
                    "info": "Neighborhood considered for corner detection.",
                    "defaultValue": 1,
                    "value": 1,
                },
                {
                    "title": "k-Size",
                    "info": "Aperture parameter for the sobel operator.",
                    "defaultValue": 3,
                    "value": 3,
                },
                {
                    "title": "K",
                    "info": "Harris detector free parameter.",
                    "defaultValue": 1,
                    "value": 1,
                },
            ],
        }
