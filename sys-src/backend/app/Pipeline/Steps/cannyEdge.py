import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError

class CannyEdge(BaseStep):
    def __call__(self, img, parameters):
        try:
            #Check if parameters are valid
            if len(img.shape) not in (2, 3): 
                raise WrongParameterError(message="[Canny Edge] Invalid image shape.")
            if len(parameters) != 2: 
                raise WrongParameterError(message="[Canny Edge] Number of paramters must be 2")

            first_threshold, second_threshold = parameters

            #Process
            return cv2.Canny(img, first_threshold, second_threshold) 
                
        except WrongParameterError as e:
            raise e
        
        except ValueError as e:
            raise WrongParameterError(message=f"[Canny Edge] {e}")

        except Exception as e:
            raise ImageProcessingError(message=f"[Canny Edge] {e}")

    def describe(self):
        return {
            "title": "Canny Edge Detector",
            "info": "Find edges using the canny algorithm.",
            "params": [
                {
                    "title": "First threshold",
                    "info": "First threshold value for hysteresis thresholding.",
                    "defaultValue": 100,
                    "value": 100,
                },
                {
                    "title": "Second threshold",
                    "info": "Second threshold value for hysteresis thresholding.",
                    "defaultValue": 200,
                    "value": 200,
                },
            ],
        }
