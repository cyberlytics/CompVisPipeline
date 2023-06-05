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
                    "defaultValue": 3,
                    "value": 3
                },
                {
                    "title": "parameter 2",
                    "info": "param info",
                    "defaultValue": 0.01,
                    "value": 0.01
                },
                {
                    "title": "parameter 3",
                    "info": "param info",
                    "defaultValue": "red",
                    "value": "red"
                }
            ]
        }
        """
        return {}
