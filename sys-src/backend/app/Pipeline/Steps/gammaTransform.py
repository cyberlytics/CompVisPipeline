from app.Pipeline.Steps.baseStep import BaseStep


class GammaTransform(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement gamma transformation
        return img

    def describe(self):
        return {
            "title": "Gamma Transformation",
            "info": "Perform gamma correction on an image.",
            "params": [
                {
                    "title": "Gamma",
                    "info": "Gamma-Value used for transformation. Must be positive number.",
                    "defaultValue": 1,
                    "value": 1,
                },
                {
                    "title": "Gain",
                    "info": "Constant which determines strength of transformation.",
                    "defaultValue": 1,
                    "value": 1,
                },
            ],
        }
