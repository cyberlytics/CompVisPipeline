class ImageProcessingError(Exception):
    """
    This Exception is raised when something went wrong during image processing
    Raise it in your own steps when user-input does not match the expected types
    """

    def __init__(self, message):
        self.message = message


class BaseStep:
    """
    Base class for all pipeline-steps.
    To create a new pipeline-step create a class yourPipelineStep(BaseStep) and override the __call__ mehtod
    """

    def __call__(self, img, parameters):
        """
        input:
        - img: matrix of the input image
        - parameters: list of str with the parameters for the current step

        returns:
        - matrix of the resulting image
        """
        return img

    def describe(self):
        """
        This method is used for creating the

        returns:
        - dict: {
            "title": "Title of this funciton",
            "info": "function info",
            "params": [
                {
                    "title": "parameter 1",
                    "info": "param info",
                    "defaultValue": 3
                },
                {
                    "title": "parameter 2",
                    "info": "param info",
                    "defaultValue": 0.01
                },
                {
                    "title": "parameter 3",
                    "info": "param info",
                    "defaultValue": "red"
                }
            ]
        }
        """
        return {}
