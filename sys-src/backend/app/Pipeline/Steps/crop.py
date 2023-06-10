from app.Pipeline.Steps.baseStep import BaseStep


class Crop(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement crop
        return img

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
