import typing
import pytest
from app.Models.startPipelineModels import PipelineStep, PipelineSteps
from app.Pipeline.Steps.baseStep import BaseStep, ImageProcessingError
from app.Pipeline.pipeline import Pipeline, PipelineError

def test_startPipelin_raises_pipelineError_when_image_is_not_in_s3(fakeS3Manager):
    pipeline = Pipeline("1234", PipelineSteps(steps=[]), s3Manager=fakeS3Manager)
    with pytest.raises(PipelineError) as e:
        pipeline.start()
    assert e.value.message == "failed to load image from s3 bucket"


def test_startPipeline_raises_pipelineError_when_image_cant_be_processed(fakeS3Manager, create_rgb_image):
    fakeS3Manager.pushImageToS3("42", create_rgb_image)
    class PipelineStepRaisesError(PipelineStep):
        func: typing.Callable = lambda x, y: exec('raise ImageProcessingError("This message should be shown in PipelineError")')
        parameters: typing.List = [1,2,4]    
    pipelineSteps = PipelineSteps(steps=[PipelineStepRaisesError()])
    pipeline = Pipeline("42", pipelineSteps, s3Manager=fakeS3Manager)
    with pytest.raises(PipelineError) as e:
        pipeline.start()
    assert e.value.message == "This message should be shown in PipelineError"

def test_startPipeline_processes_image_correctly(fakeS3Manager, create_rgb_image):
    fakeS3Manager.pushImageToS3("42", create_rgb_image)
    pipelineStep1 = PipelineStep(**{"func": "test", "parameters": ["1","2","3"]})
    pipelineStep2 = PipelineStep(**{"func": "test", "parameters": ["1","2","3"]})
    pipeline = Pipeline("42", steps=PipelineSteps(steps=[pipelineStep1, pipelineStep2]), s3Manager=fakeS3Manager)
    result = pipeline.start()
    assert len(result) == 3
    assert result[0] == "42"
    assert (fakeS3Manager.getImageFromS3(result[1])[1] == create_rgb_image).all()
    assert (fakeS3Manager.getImageFromS3(result[2])[1] == create_rgb_image).all()
