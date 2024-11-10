from django.urls import path
from .views import my_func

urlpatterns = [
    path('api/generate-plot/', my_func, name='generate-plot'),
]
