import cv2

from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class CLAHE(BaseStep):
    def __call__(self, img, parameters):
        try:
            p0 = int(parameters[0])
            p1 = int(parameters[1])
            p2 = int(parameters[2])

            if len(img.shape) != (2): raise WrongParameterError("[CLAHE] Invalid image shape! Image has to be a grayscale image!")
            if p0 <= 0: raise WrongParameterError("[CLAHE] Clip limit has to be positive!")
            if p1 <= 0: raise WrongParameterError("[CLAHE] Grid width has to be positive!")
            if p2 <= 0: raise WrongParameterError("[CLAHE] Grid height has to be positive!")
            
            clahe = cv2.createCLAHE(clipLimit=p0, tileGridSize=(p1,p2))
            return clahe.apply(img)

        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[CLAHE] {e}")
        except NameError as e:
            raise WrongParameterError(message=f"[CLAHE] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[CLAHE] {e}")

    def describe(self):
        return {
            "title": "Contrast Limited Adaptive Histogram Equalization",
            "info": "Equalize histogram of a grayscale image using CLAHE.",
            "params": [
                {
                    "title": "Clip Limit",
                    "info": "Threshold for contrast limiting.",
                    "defaultValue": 40,
                    "value": 40,
                },
                {
                    "title": "Grid Width",
                    "info": "Grid width for histogram equalization. Must be bigger than 0.",
                    "defaultValue": 8,
                    "value": 8,
                },
                {
                    "title": "Grid Height",
                    "info": "Grid height for histogram equalization. Must be bigger than 0.",
                    "defaultValue": 8,
                    "value": 8,
                },
            ],
        }
