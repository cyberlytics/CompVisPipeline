from app.Pipeline.Steps.baseStep import BaseStep


class ConvertColor(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement color converting
        pass

    def describe(self):
        return {
            "title": "Convert Color",
            "info": "Change color space of an image.",
            "params": [
                {
                    "title": "Color Space",
                    "info": "Colorspace to convert into. Possible values are: 'gray', 'rgb', 'hsv' and 'bgr'.",
                    "defaultValue": "gray",
                    "value": "gray",
                },
            ],
        }
