from app.Pipeline.Steps.baseStep import BaseStep


class Flip(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement flip
        return img

    def describe(self):
        return {
            "title": "Flip Image",
            "info": "Flip image vertically or horizontally or both.",
            "params": [
                {
                    "title": "Axis",
                    "info": "Axis on which the image is flipped. 0 means vertical, positive numbers mean horizontal, negative numbers mean both.",
                    "defaultValue": 0,
                    "value": 0,
                },
            ],
        }
