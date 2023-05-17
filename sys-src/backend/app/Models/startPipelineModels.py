from pydantic import BaseModel, validator, ValidationError
import typing

from app.Pipeline.pipeline import FUNCTION_LIST


class PipelineStep(BaseModel):
    id: int
    params: typing.List

    @validator("id")
    def funcNameMustBeDefined(cls, v):
        if v >= len(FUNCTION_LIST) or v < 0:
            raise ValidationError()
        return v
