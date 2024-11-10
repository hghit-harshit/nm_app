# api/urls.py
from django.urls import path
from .views import my_func

urlpatterns = [
    path('call-function/', my_func),
]
