from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import main_siteSerializer
from .models import main_site
from .Q3a import plot_results
import logging

# Create your views here.


# Create your views here.

class main_siteView(viewsets.ModelViewSet):
    serializer_class = main_siteSerializer
    queryset = main_site.objects.all()
    
@api_view(['GET'])
def my_func(request):
    try:
        P = 10  # Parameter for the plot
        y0 = 0  # Initial boundary value
        y_end = 1  # Final boundary value
        step_size = 0.000001  # Step size
        
        # Generate plot
        image_base64 = plot_results(P, y0, y_end, step_size)
        
        # Check if image_base64 was successfully created
        if not image_base64:
            logging.error("Failed to generate base64 image.")
            return Response({"error": "Image generation failed"}, status=500)
        
        # Return response with the base64-encoded image
        return Response({"image": image_base64})
    except Exception as e:
        logging.error(f"Error in my_func: {e}")
        return Response({"error": str(e)}, status=500)