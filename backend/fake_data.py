from faker import Faker

from app.database import models
from app.database.crud import create_target, create_target_picture
from app.database.schemas import PictureCreate, TargetIn
from app.database.session import get_db

faker = Faker()


def main():
    db = next(get_db())

    db.query(models.Target).delete()
    db.query(models.Picture).delete()
    db.commit()

    for _ in range(0, 100):
        target = TargetIn(
            first_name=faker.first_name(),
            last_name=faker.last_name(),
            dob=faker.date_of_birth(minimum_age=16, maximum_age=55),
        )
        db_target = create_target(db, target)
        for _ in range(0, 10):
            picture = PictureCreate(path=faker.file_path())
            create_target_picture(db, picture, db_target.id)


if __name__ == "__main__":
    main()
