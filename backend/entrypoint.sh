#!/bin/sh

alembic upgrade head
python app/main.py
