from rest_framework import generics
from .models import Listing
from .serializers import ListingSerializer
from .permissions import IsStaffOrTeacherOrUniversity, IsAuthor

class ListingListCreate(generics.ListCreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [IsStaffOrTeacherOrUniversity]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ListingRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [IsAuthor]

    lookup_field = 'slug'
