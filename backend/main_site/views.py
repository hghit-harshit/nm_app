from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import main_siteSerializer
from .models import main_site
from .Q3a import *

# Create your views here.


# Create your views here.

class main_siteView(viewsets.ModelViewSet):
    serializer_class = main_siteSerializer
    queryset = main_site.objects.all()
    
def my_func(req):
    P = 10  # For example, you can change this as needed
    y0 = 0  # Initial value
    y_end = 1  # Final value
    step_size = 0.000001  # Step size for the methods
    
    # Call the plot function
    image_base64 = plot_results(P, y0, y_end, step_size)
    
    # Send the image back to React
    return Response({"image": image_base64})