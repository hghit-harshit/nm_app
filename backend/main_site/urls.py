from django.urls import path
from .views import *

urlpatterns = [
    path('assignment1_view/', assignment1_view, name='assignment1_view'),
    path('csrf-token/', get_csrf_token, name='get_csrf_token'),
    path('assignment2_view/', assignment2_view, name='assignment2_view'),
    path('assignment3_view/',assignment3_view,name = 'assignment3_view')
    #path('compute-gauss-legendre/<int:n>/',gauss_legendre_quadrature, name='gauss_legendre_quadrature'),
]
