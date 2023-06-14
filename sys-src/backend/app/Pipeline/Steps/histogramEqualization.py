from app.Pipeline.Steps.baseStep import BaseStep


class HistogramEqualization(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement histogram equalization
        return img

    def describe(self):
        return {
            "title": "Histogram Equalization",
            "info": "Equalize histogram of a grayscale image. If image is not already a grayscale image, it will be converted first.",
            "params": [],
        }
