from pydantic import BaseModel, validator, ValidationError
import typing

from app.Pipeline.Steps.baseStep import BaseStep
from app.Pipeline.Steps.bilateralFilter import BilateralFilter
from app.Pipeline.Steps.gaussianBlur import GaussianBlur

FUNCTION_NAME_MAPPER = {
    "bilateralFilter": BilateralFilter(),
    "gaussianBlur": GaussianBlur(),
    "test": BaseStep(), # This step is just for testing and returns the input image
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
