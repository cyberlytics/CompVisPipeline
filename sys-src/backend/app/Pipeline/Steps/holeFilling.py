from app.Pipeline.Steps.baseStep import BaseStep


class HoleFilling(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement hole filling.
        return img

    def describe(self):
        return {
            "title": "Hole Filling",
            "info": "Fill holes in an image.",
            "params": [
                {
                    "title": "Kernel Shape",
                    "info": "Determines shape of structuring element. 0 means rectangle, 1 means cross and 2 means ellipse.",
                    "defaultValue": 0,
                    "value": 0,
                },
                {
                    "title": "Kernel Width",
                    "info": "Width of structuring element. Must be bigger than 1.",
                    "defaultValue": 3,
                    "value": 3,
                },
                {
                    "title": "Kernel Height",
                    "info": "Height of structuring element. Must be bigger than 1.",
                    "defaultValue": 3,
                    "value": 3,
                },
            ],
        }
