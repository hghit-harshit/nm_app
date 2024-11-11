from django.urls import path
from .views import *

urlpatterns = [
    path('process-csv/', process_csv, name='process_csv'),
    path('csrf-token/', get_csrf_token, name='get_csrf_token'),
    path('calculate-gauss-legendre/', calculate_gauss_legendre, name='calculate_gauss_legendre'),
    path('assignment3_view/',assignment3_view,name = 'assignment3_view')
    #path('compute-gauss-legendre/<int:n>/',gauss_legendre_quadrature, name='gauss_legendre_quadrature'),
]
