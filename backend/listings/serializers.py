from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.ModelSerializer):
    author_email = serializers.CharField(source='author.email', read_only=True)

    class Meta:
        model = Listing
        fields = ['id', 'name', 'slug', 'description', 'modules_count', 'price', 'author_email', 'picture']
        read_only_fields = ['slug', 'author_email']
