from rest_framework import serializers
from .models import main_site

class main_siteSerializer(serializers.ModelSerializer):
    class Meta:
        model = main_site
        fields = ('id', 'title', 'description', 'completed')