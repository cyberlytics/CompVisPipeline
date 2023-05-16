from uuid import uuid4
from app.Pipeline.Steps.baseStep import ImageProcessingError

from app.connections.aws_s3 import S3Manager


class PipelineError(Exception):
    def __init__(self, message):
        self.message = message


class Pipeline:
    def __init__(self, image, steps, s3Manager=None):
        self.image = image
        self.steps = steps.steps
        self.s3Manager = s3Manager or S3Manager()

    def start(self):
        metaData, lastImage = self.s3Manager.getImageFromS3(self.image)
        if metaData["HTTPStatusCode"] != 200:
            raise PipelineError(message="failed to load image from s3 bucket")
        allResults = [self.image]
        for step in self.steps:
            try:
                lastImage = step.func(lastImage, step.parameters)
            except ImageProcessingError as e:
                raise PipelineError(message=e.message)
            id = str(uuid4())
            metaData = self.s3Manager.pushImageToS3(id, lastImage)
            if metaData["HTTPStatusCode"] != 200:
                raise PipelineError(message="failed to save image to s3 bucket")
            allResults.append(id)
        return allResults
