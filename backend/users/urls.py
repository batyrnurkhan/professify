from django.urls import path
from .views import CreateUserView, CustomObtainAuthToken, UserProfile, UniversityViewTeachers
from django.urls import include
from . import views


urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('login/', CustomObtainAuthToken.as_view(), name='login'),
    path('profile/', UserProfile.as_view(), name='user_profile'),
    path('teachers/', UniversityViewTeachers.as_view(), name='teachers'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('resumes/', views.ResumesView.as_view(), name='resumes'),
    path('resumes/<int:pk>/', views.ResumesView.as_view(), name='resumes'),
]
