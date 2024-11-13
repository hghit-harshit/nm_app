#!/bin/bash

source backend/venv/bin/activate

cd frontend
npm start &

cd ../backend
python3 manage.py runserver
