from django.urls import path
from .views import ListingListCreate, ListingRetrieveUpdate

urlpatterns = [
    path('', ListingListCreate.as_view(), name='listing_list_create'),
    path('<slug:slug>/', ListingRetrieveUpdate.as_view(), name='listing_retrieve_update'),
]
