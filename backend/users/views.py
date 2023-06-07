from rest_framework import generics, permissions, status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import logout
from django.shortcuts import get_object_or_404
from .models import CustomUser, TeacherProfile, UniversityProfile
from .serializers import * 
from .permissions import CanUpdateProfile, IsUniversity, IsTeacher, IsTeacherOrUniversity


class CreateUserView(generics.CreateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = (permissions.AllowAny,)


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = response.data.get('token')

        if token:
            user = Token.objects.get(key=token).user
            response.data = {
                'token': token,
                'email': user.email,
                'is_staff': user.is_staff,
                'is_teacher': user.is_teacher,
                'is_university': user.is_university,
                'is_default': user.is_default
            }

        return response


class UniversityProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UniversityProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsUniversity]

    def get_object(self):
        user = self.request.user
        profile, created = UniversityProfile.objects.get_or_create(user=user)
        return profile

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UpdateUniversityProfileSerializer
        return UniversityProfileSerializer


class TeacherProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = TeacherProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def get_object(self):
        user = self.request.user
        profile, created = TeacherProfile.objects.get_or_create(user=user)
        return profile

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UpdateTeacherProfileSerializer
        return TeacherProfileSerializer
    
    


class UniversityViewTeachers(generics.ListAPIView):
    serializer_class = UniversityViewTeacherSerializer
    permission_classes = [permissions.IsAuthenticated, IsUniversity]

    def get_queryset(self):
        return CustomUser.objects.filter(is_teacher=True)


class LogoutView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)


class ResumesView(generics.ListAPIView):
    serializer_class = TeacherProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrUniversity]

    def get_queryset(self):
        return TeacherProfile.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

class TeacherApplicationCreate(generics.CreateAPIView):
    serializer_class = TeacherApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


class TestUsersView(generics.ListAPIView):
    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer