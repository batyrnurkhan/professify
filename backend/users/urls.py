from django.urls import path
from .views import (
    CreateUserView,
    CustomObtainAuthToken,
    UniversityProfileView,
    TeacherProfileView,
    UniversityViewTeachers,
    LogoutView,
    ResumesView,
    TeacherApplicationCreate,
)

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('login/', CustomObtainAuthToken.as_view(), name='login'),
    path('profile/university/', UniversityProfileView.as_view(), name='university_profile'),
    path('profile/teacher/', TeacherProfileView.as_view(), name='teacher_profile'),
    path('teachers/', UniversityViewTeachers.as_view(), name='teachers'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('resumes/', ResumesView.as_view(), name='resumes'),
    path('teacher/application/', TeacherApplicationCreate.as_view(), name='teacher_application_create'),
]
