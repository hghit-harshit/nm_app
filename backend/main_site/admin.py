from django.contrib import admin
from .models import main_site
class main_siteAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

# Register your models here.

admin.site.register(main_site, main_siteAdmin)