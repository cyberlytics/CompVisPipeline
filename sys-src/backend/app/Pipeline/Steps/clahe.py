from app.Pipeline.Steps.baseStep import BaseStep


class CLAHE(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement CLAHE.
        return img

    def describe(self):
        return {
            "title": "Contrast Limited Adaptive Histogram Equalization",
            "info": "Equalize histogram of a grayscale image using CLAHE. If image is not already a grayscale image, it will be converted first.",
            "params": [
                {
                    "title": "Clip Limit",
                    "info": "Threshold for contrast limiting.",
                    "defaultValue": 40,
                    "value": 40,
                },
                {
                    "title": "Grid Width",
                    "info": "Grid width for histogram equalization. Must be bigger than 0.",
                    "defaultValue": 8,
                    "value": 8,
                },
                {
                    "title": "Grid Height",
                    "info": "Grid height for histogram equalization. Must be bigger than 0.",
                    "defaultValue": 8,
                    "value": 8,
                },
            ],
        }
