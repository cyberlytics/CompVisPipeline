from app.Pipeline.Steps.baseStep import BaseStep


class AnisotropicDiffusion(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement anisotropic diffusion filter
        pass

    def describe(self):
        return {
            "title": "Anisotropic Diffusion",
            "info": "Reduce noise using anisotropic difussion.",
            "params": [
                {
                    "title": "Alpha Value",
                    "info": "Amount of time to step forward by in each iteration. Must be positive, normally between 0 and 1.",
                    "defaultValue": 0.1,
                    "value": 0.1,
                },
                {
                    "title": "Sensitivity",
                    "info": "Sensitivity to the edges.",
                    "defaultValue": 1,
                    "value": 1,
                },
                {
                    "title": "Iterations",
                    "info": "Number of iterations. Must be bigger than 0",
                    "defaultValue": 1,
                    "value": 1,
                },
            ],
        }
