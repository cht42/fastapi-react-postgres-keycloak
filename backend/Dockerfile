
FROM python:3.7-alpine

WORKDIR /app

RUN apk update && apk add postgresql-client

COPY ./requirements.txt ./requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY ./entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
