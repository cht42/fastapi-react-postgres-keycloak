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

You can then access the keycloak console and login with the admin credentials: http://localhost:8080
