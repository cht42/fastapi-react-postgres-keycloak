"""Model corresponding to DB state."""
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .session import Base


class Target(Base):
    __tablename__ = "targets"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    age = Column(Integer)

    pictures = relationship("Picture", back_populates="target")


class Picture(Base):
    __tablename__ = "pictures"

    id = Column(Integer, primary_key=True, index=True)
    path = Column(String)
    target_id = Column(Integer, ForeignKey("targets.id"))

    target = relationship("Target", back_populates="pictures")
