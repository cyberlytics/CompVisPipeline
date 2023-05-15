from app.Models.startPipelineModels import PipelineSteps, PipelineStep


def test_PipelineSteps_empty_list():
    test = {"steps": []}
    pipelineSteps = PipelineSteps(**test)
    assert pipelineSteps == PipelineSteps(steps=[])


def test_PipelineStep_empty_parameter_list():
    test = {"func": "test", "parameters": []}
    pipelineStep = PipelineStep(**test)
    assert pipelineStep == PipelineStep(func="test", parameters=[])


def test_PipelineStep_parameter_list_not_empty():
    test = {"func": "test", "parameters": [1, 2, 3]}
    pipelineStep = PipelineStep(**test)
    assert pipelineStep == PipelineStep(func="test", parameters=[1, 2, 3])
    assert pipelineStep.func(1, 2) == 1
