from pydantic import ValidationError
import pytest
from app.Models.startPipelineModels import PipelineStep
from app.Pipeline.Steps.baseStep import BaseStep
from app.Pipeline.pipeline import FUNCTION_LIST


def test_pipelineStep_raises_validation_error_for_to_large_id():
    with pytest.raises(ValidationError):
        PipelineStep(id=len(FUNCTION_LIST) + 100, params=[])


def test_pipelineStep_raises_validation_error_for_negative_id():
    with pytest.raises(ValidationError):
        PipelineStep(id=-20, params=[])


def test_pipelineStep_contains_correct_id_and_params(mocker):
    fakeFunctionList = [BaseStep()]
    mocker.patch("app.Models.startPipelineModels.FUNCTION_LIST", fakeFunctionList)
    pipelineStep = PipelineStep(id=0, params=[1, 2.3, "hallo"])
    assert pipelineStep.id == 0
    assert pipelineStep.params == [1, 2.3, "hallo"]
