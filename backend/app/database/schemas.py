"""Schemas used for input and output data validation."""
import typing as tp

from pydantic import BaseModel


class PictureBase(BaseModel):
    path: str


class PictureCreate(PictureBase):
    pass


class Picture(PictureBase):
    id: int
    target_id: int

    class Config:
        orm_mode = True


class TargetBase(BaseModel):
    first_name: str
    last_name: str
    age: int


class TargetIn(TargetBase):
    pass


class Target(TargetBase):
    id: int
    pictures: tp.List[Picture] = []

    class Config:
        orm_mode = True
