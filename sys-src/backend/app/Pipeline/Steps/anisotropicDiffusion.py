import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class AnisotropicDiffusion(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = float(parameters[0])
            p1 = float(parameters[1])
            p2 = int(parameters[2])

            if len(img.shape) < 3 or img.shape[2] != 3: raise WrongParameterError(message="[AnisotropicDiffusion] Image must have three color channels!")
            if p0 <= 0: raise WrongParameterError(message="[AnisotropicDiffusion] Alpha value must be larger than zero!")
            if p2 < 1: raise WrongParameterError(message="[AnisotropicDiffusion] Number of iterations must be larger than zero!")

            return cv2.ximgproc.anisotropicDiffusion(img, p0, p1, p2)
        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[AnisotropicDiffusion] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[AnisotropicDiffusion] {e}")

    def describe(self):
        return {
            "title": "Anisotropic Diffusion",
            "info": "Reduce noise using anisotropic difussion.",
            "params": [
                {
                    "title": "Alpha Value",
                    "info": "Amount of time to step forward by in each iteration. Must be bigger than zero, normally between 0 and 1.",
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
