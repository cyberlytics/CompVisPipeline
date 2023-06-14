from typing import Any
from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError

class ConvertType(BaseStep):
    def __call__(self, img, parameters):
        try:
            if len(img.shape) not in (2, 3): raise WrongParameterError(message="Invalid image shape!")

            return img.astype("uint8")
        except WrongParameterError as e:
            raise e
        except Exception as e:
            raise ImageProcessingError(message=e)

    def describe():
        return {
            "title": "Convert Type",
            "info": "Convert image values type to 'uint8'.",
            "params": []
        }