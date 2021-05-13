# fastapi-react-postgres-keycloak

## Keycloak installation

Create a `.env` file based on the `.env.example` file.

> :warning: Don't forget to put values for the password fields

Next step is to launch keycloak:

```bash
docker-compose up -d keycloak
```

To initialize Keycloak with a client and a user, you can use the script in the keycloak folder. Find out more about the API calls made in the [Keycloak doc](https://www.keycloak.org/docs-api/5.0/rest-api/index.html).

> You can change the script to have different values for the client name, username, password...

```bash
bash keycloak/init.sh
```

In the output of the script you will find the client secret. Copy it and put it the `.env`.

You can then access the keycloak console and login with the admin credentials: http://localhost:8080

## Running database migrations using [Alembic](https://alembic.sqlalchemy.org).

First, modify your models in the file `database/models.py`.
Then run the following command to generate the migration:

```bash
docker-compose exec backend alembic revision --autogenerate -m "<Your message>"
```

> :warning: Check this [page](https://alembic.sqlalchemy.org/en/latest/autogenerate.html#what-does-autogenerate-detect-and-what-does-it-not-detect) to see what alembic detects for the Autogenerate

Check the migration file in the `alembic/versions` folder. If you are happy with it, you can run the migration:

```bash
docker-compose exec backend alembic upgrade head
```

Your database is now up to date !

## Generate fake data

To facilitate development, you can generate some fake data by running the following command:

```bash
docker-compose exec backend python fake_data.py
```

## Create frontend app

In frontend folder, run:

```bash
npx create-react-app app --template typescript --use-npm
```
