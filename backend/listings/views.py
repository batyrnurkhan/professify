from rest_framework import generics
from .models import Listing
from .serializers import ListingSerializer
from .permissions import IsStaffOrTeacherOrUniversity, IsAuthor, IsAuthenticated, IsAuthorOrReadOnly

class ListingListCreate(generics.ListCreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        print("Saved listing:", serializer.data)

class ListingRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [IsAuthorOrReadOnly]

    lookup_field = 'slug'
