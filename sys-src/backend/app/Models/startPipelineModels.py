from pydantic import BaseModel, validator, ValidationError
import typing

FUNCTION_NAME_MAPPER = {
    "bilateralFilter" : lambda x, y: x, # TODO: add openCV functions here
    "test": lambda x, y: x
}

class PipelineStep(BaseModel):
    func: typing.Callable
    parameters: typing.List[str]

    @validator("func", pre=True)
    def funcNameMustBeDefined(cls, v):
        if v not in FUNCTION_NAME_MAPPER.keys():
            raise ValidationError("Function-Name not defined")
        return FUNCTION_NAME_MAPPER[v]

class PipelineSteps(BaseModel):
    steps: typing.List[PipelineStep]