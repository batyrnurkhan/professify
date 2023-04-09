from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['id', 'name', 'slug', 'description', 'modules_count', 'price', 'author']
        read_only_fields = ['slug', 'author']
