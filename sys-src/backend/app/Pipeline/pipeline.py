from uuid import uuid4

class Pipeline:
    def __init__(self, image, steps, s3Manager=None):
        self.image = image
        self.steps = steps.steps

    def start(self):
        # TODO: load image from s3 bucket
        lastImage = self.image
        allResults = []
        for step in self.steps:
            lastImage = step.func(lastImage, step.parameters)
            # TODO: push image to s3 bucket
            id = str(uuid4())
            allResults.append(id)
        return allResults