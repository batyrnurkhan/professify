from django.contrib import admin
from django.utils.text import slugify
from .models import Listing

class ListingAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}

    def save_model(self, request, obj, form, change):
        if not obj.slug:
            obj.slug = slugify(obj.name)
        super().save_model(request, obj, form, change)

admin.site.register(Listing, ListingAdmin)
