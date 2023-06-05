class BaseError(Exception):
    """
    This is the base class for all Exceptions in this project.
    Please inherit from this class for your own Exceptions
    """

    def __init__(self, message, *args: object):
        self.message = message
        super().__init__(*args)


class MetadataError(BaseError):
    """
    This Exception is raised when something went wrong during creation of the histogram or metadata for an image
    """

    ...


class AWSError(BaseError):
    """
    This Exception is raised when something went wrong during loading data from or to S3 Bucket
    """

    ...


class ImageProcessingError(BaseError):
    """
    This Exception is raised when something went wrong during image processing
    Raise it in your own steps when user-input does not match the expected types
    """

    ...


class WrongParameterError(BaseError):
    """
    This Exception is raised when the user typed in wrong Parameters
    """

    ...
