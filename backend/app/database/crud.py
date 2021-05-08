"""CRUD operations on database."""
import typing as tp

from fastapi import HTTPException
from sqlalchemy.orm import Session

from . import models, schemas


def get_target(db: Session, target_id: int) -> schemas.Target:
    target = db.query(models.Target).filter(models.Target.id == target_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Target not found")
    return target


def get_targets(
    db: Session, skip: int = 0, limit: int = 100
) -> tp.List[schemas.Target]:
    return db.query(models.Target).offset(skip).limit(limit).all()


def create_target(db: Session, target: schemas.TargetIn) -> schemas.Target:
    db_target = models.Target(**target.dict())
    db.add(db_target)
    db.commit()
    db.refresh(db_target)
    return db_target


def edit_target(
    db: Session, target_id: int, target: schemas.TargetIn
) -> schemas.Target:
    db_target = get_target(db, target_id)
    if not db_target:
        raise HTTPException(status_code=404, detail="Target not found")

    update_data = target.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_target, key, value)

    db.add(db_target)
    db.commit()
    db.refresh(db_target)
    return db_target


def delete_target(db: Session, target_id: int) -> schemas.Target:
    target = get_target(db, target_id)
    if not target:
        raise HTTPException(status_code=404, detail="Target not found")
    db.delete(target)
    db.commit()
    return target


def get_pictures(
    db: Session, skip: int = 0, limit: int = 100
) -> tp.List[schemas.Picture]:
    return db.query(models.Picture).offset(skip).limit(limit).all()


def create_target_picture(
    db: Session, picture: schemas.PictureCreate, target_id: int
) -> schemas.Picture:
    db_picture = models.Picture(**picture.dict(), target_id=target_id)
    db.add(db_picture)
    db.commit()
    db.refresh(db_picture)
    return db_picture
