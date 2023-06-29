import numpy as np
from app.Pipeline.Steps.baseStep import BaseStep
from app.exceptions import ImageProcessingError, WrongParameterError


class Crop(BaseStep):
    def __call__(self, img, parameters):
        try:
            #Parse parameters
            start_x = int(parameters[0])
            start_y = int(parameters[1])
            distance_x = int(parameters[2])
            distance_y = int(parameters[3])
            inverse = parameters[4]

            #calculate end positions
            end_x = start_x + distance_x
            end_y = start_y + distance_y

            #validate parameters
            if len(img.shape) not in (2, 3):
                raise WrongParameterError(message="[Crop] Invalid image shape!")
            if start_x < 0 or start_y < 0:
                raise WrongParameterError(message="[Crop] Start coordinates must be positive!")
            if distance_x == 0 or distance_y == 0:
                raise WrongParameterError(message="[Crop] Distance cannot be zero!")
            if end_x > img.shape[1] or end_y > img.shape[0]:
                raise WrongParameterError(message="[Crop] Crop area exceeds image boundaries!")
            if type(inverse) is not bool: 
                raise WrongParameterError(message="[Crop] Inverse parameter must be a boolean value!")

            #process crop
            if inverse:
                cropped_img = np.copy(img)
                cropped_img[start_y:end_y, start_x:end_x] = 0
            else:
                cropped_img = img[start_y:end_y, start_x:end_x]

            return cropped_img

        except WrongParameterError as e:
            raise e
        except ValueError as e:
            raise WrongParameterError(message=f"[Crop] {e}")
        except Exception as e:
            raise ImageProcessingError(message=f"[Crop] {e}")


    def describe(self):
        return {
            "title": "Crop Image",
            "info": "Crop specific area of image.",
            "params": [
                {
                    "title": "Start X",
                    "info": "X value of pixel where the crop should start. Must be a positive number.",
                    "defaultValue": 0,
                    "value": 0,
                },
                {
                    "title": "Start Y",
                    "info": "Y value of pixel where the crop should start. Must be a positive number.",
                    "defaultValue": 0,
                    "value": 0,
                },
                {
                    "title": "Distance X",
                    "info": "Width of the crop. Negative numbers symbolize crop in other direction.",
                    "defaultValue": 50,
                    "value": 50,
                },
                {
                    "title": "Distance Y",
                    "info": "Height of the crop. Negative numbers symbolize crop in other direction.",
                    "defaultValue": 50,
                    "value": 50,
                },
                {
                    "title": "Inverse",
                    "info": "Crops specified area out and keeps everything around it.",
                    "defaultValue": False,
                    "value": False,
                },
            ],
        }
