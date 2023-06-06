from app.Pipeline.Steps.baseStep import BaseStep


class Rotate(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement image rotation
        return img

    def describe(self):
        return {
            "title": "Rotate Image",
            "info": "Rotate image by 90, 180 or 270 degrees.",
            "params": [
                {
                    "title": "Rotation",
                    "info": "Amount to rotate the image by. 0 means 90, 1 means 180 and 2 means 270 degrees clockwise.",
                    "defaultValue": 0,
                    "value": 0,
                }
            ],
        }
