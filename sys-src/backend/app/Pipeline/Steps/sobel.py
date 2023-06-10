from app.Pipeline.Steps.baseStep import BaseStep


class Sobel(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement sobel edge detector.
        return img

    def describe(self):
        return {
            "title": "Sobel Edge Detector",
            "info": "Perform edge detection using sobel kernel.",
            "params": [
                {
                    "title": "Kernel size",
                    "info": "Size of sobel kernel. Must be 1, 3, 5, or 7.",
                    "defaultValue": 3,
                    "value": 3,
                },
            ],
        }
