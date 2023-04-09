from django.urls import path
from .views import CreateUserView, CustomObtainAuthToken, UserProfile, UniversityViewTeachers

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('login/', CustomObtainAuthToken.as_view(), name='login'),
    path('profile/', UserProfile.as_view(), name='user_profile'),
    path('teachers/', UniversityViewTeachers.as_view(), name='teachers'),
]