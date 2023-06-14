from app.Pipeline.Steps.baseStep import BaseStep


class ConnectedComponents(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement connected components
        return img

    def describe(self):
        return {
            "title": "Connected Components",
            "info": "Computes connected components image of an image.",
            "params": [
                {
                    "title": "Connectivity",
                    "info": "Neighbor connectivity used for computing connected components. Must be either 4 or 8.",
                    "defaultValue": 4,
                    "value": 4,
                },
            ],
        }
