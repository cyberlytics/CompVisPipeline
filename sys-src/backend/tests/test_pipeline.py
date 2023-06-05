import pytest
import numpy as np
from app.Models.startPipelineModels import PipelineStep
from app.Pipeline.Steps.baseStep import BaseStep
from app.Pipeline.pipeline import Pipeline
from app.metadata import Metadata
from app.exceptions import AWSError, ImageProcessingError


def test_pipeline_raises_aws_error_failed_to_load_image_from_s3(fakeS3Manager):
    pipeline = Pipeline("42", [], s3Manager=fakeS3Manager)
    with pytest.raises(AWSError) as e:
        pipeline.start()
    assert e.value.message == "failed to get Image from S3 bucket"


def test_pipeline_raises_image_processing_error_image_processing_failed(
    fakeS3Manager, pipelineStepRaisesError, create_rgb_image
):
    fakeS3Manager.pushImageToS3("42", create_rgb_image)
    metadata = Metadata(fakeS3Manager)
    pipeline = Pipeline(
        "42",
        [PipelineStep(id=0, params=[])],
        fakeS3Manager,
        metadata,
        [pipelineStepRaisesError],
    )
    with pytest.raises(ImageProcessingError) as e:
        pipeline.start()
    assert e.value.message == "failed to process Image"


def test_pipeline_result_is_saved_to_s3(fakeS3Manager, create_rgb_image):
    fakeS3Manager.pushImageToS3("42", create_rgb_image)
    metaData = Metadata(fakeS3Manager)
    pipeline = Pipeline(
        "42", [PipelineStep(id=0, params=[])], fakeS3Manager, metaData, [BaseStep()]
    )
    results = pipeline.start()
    assert len(results) == 2
    assert results[0]["imageId"] == "42"
    assert (
        fakeS3Manager.getImageFromS3(results[0]["imageId"]) == create_rgb_image
    ).all()
    assert (
        fakeS3Manager.getImageFromS3(results[1]["imageId"]) == create_rgb_image
    ).all()
    for result in results:
        assert "channels" in result.keys()
        assert "height" in result.keys()
        assert "width" in result.keys()


def test_pipeline_all_steps_are_executed(fakeS3Manager, create_rgb_image):
    fakeS3Manager.pushImageToS3("42", create_rgb_image)
    steps = [PipelineStep(id=0, params=[]) for _ in range(4)]
    metadata = Metadata(fakeS3Manager)
    pipeline = Pipeline("42", steps, fakeS3Manager, metadata, [BaseStep()])
    results = pipeline.start()
    assert len(results) == len(steps) + 1
    assert results[0]["imageId"] == "42"
    for result in results:
        assert (
            fakeS3Manager.getImageFromS3(result["imageId"]) == create_rgb_image
        ).all()
        assert fakeS3Manager.getImageFromS3(result["histId"]) is not None
        assert "channels" in result.keys()
        assert "height" in result.keys()
        assert "width" in result.keys()


def test_pipeline_steps_are_executed_in_correc_order(fakeS3Manager, mocker):
    testImage = np.array([[1]])
    fakeS3Manager.pushImageToS3("42", testImage)

    class FakePipelineStep(BaseStep):
        def __init__(self, number):
            self.number = number

        def __call__(self, img, parameters):
            return self.number

    class FakeMetaDataManager:
        def getMetadata(self, image):
            return ("THIS_IS_A_HIST_ID", 42, 42, 3)

    fakeFunctionList = [FakePipelineStep(2), FakePipelineStep(1), FakePipelineStep(3)]
    # mocker.patch("app.Models.startPipelineModels.FUNCTION_LIST", fakeFunctionList)
    steps = [
        PipelineStep(id=1, params=[]),
        PipelineStep(id=0, params=[]),
        PipelineStep(id=2, params=[]),
    ]
    metaData = FakeMetaDataManager()
    pipeline = Pipeline("42", steps, fakeS3Manager, metaData, fakeFunctionList)
    results = pipeline.start()
    assert len(results) == 4
    assert results[0]["imageId"] == "42"
    assert fakeS3Manager.getImageFromS3(results[1]["imageId"]) == 1
    assert fakeS3Manager.getImageFromS3(results[2]["imageId"]) == 2
    assert fakeS3Manager.getImageFromS3(results[3]["imageId"]) == 3
