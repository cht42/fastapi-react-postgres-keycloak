"""Target router."""
import typing as tp

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import crud, schemas
from app.database.session import get_db

router = APIRouter()


@router.post("", response_model=schemas.Target)
def create_target(
    target: schemas.TargetIn, db: Session = Depends(get_db)
) -> schemas.Target:
    """Create a target."""
    return crud.create_target(db, target)


@router.get(
    "",
    response_model=tp.List[schemas.Target],
    response_model_include={"id", "first_name", "last_name"},
)
def read_targets(db: Session = Depends(get_db)) -> tp.List[schemas.Target]:
    """Get all targets."""
    return crud.get_targets(db)


@router.get("/{target_id}", response_model=schemas.Target)
def read_target(target_id: int, db: Session = Depends(get_db)) -> schemas.Target:
    """Get a specific target."""
    return crud.get_target(db, target_id)


@router.delete("/{target_id}", response_model=schemas.Target)
def delete_target(target_id: int, db: Session = Depends(get_db)) -> schemas.Target:
    """Delete a target."""
    return crud.delete_target(db, target_id)


@router.put("/{target_id}", response_model=schemas.Target)
def edit_target(
    target_id: int, target: schemas.TargetIn, db: Session = Depends(get_db)
) -> schemas.Target:
    """Edit a target."""
    return crud.edit_target(db, target_id, target)


@router.get("/pictures", response_model=tp.List[schemas.Picture])
def read_pictures(db: Session = Depends(get_db)) -> tp.List[schemas.Picture]:
    """Get all pictures."""
    return crud.get_pictures(db)


@router.post("/{target_id}/pictures", response_model=schemas.Picture)
def create_picture_for_target(
    target_id: int, picture: schemas.PictureCreate, db: Session = Depends(get_db)
) -> schemas.Picture:
    """Create a picture belonging to a target."""
    return crud.create_target_picture(db, picture, target_id)
