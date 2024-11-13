#!/bin/bash

cd frontend
npm start &

cd ../backend
python3 manage.py runserver
