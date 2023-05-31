from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import CustomUserSerializer, ProfileSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import Profile, CustomUser
from listings.models import Listing
from .serializers import CustomUserSerializer, ProfileSerializer, UniversityViewTeacherSerializer
from rest_framework import generics, permissions
from .permissions import CanUpdateProfile, IsUniversity
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import logout

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

class UserProfile(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated, CanUpdateProfile]

    def post(self, request, *args, **kwargs):
        user = request.user

        if user.is_teacher:
            return Response({"message": "User is already a teacher"}, status=status.HTTP_400_BAD_REQUEST)

        user.is_teacher = True
        user.save()

        profile, created = Profile.objects.get_or_create(user=user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def get_object(self):
        user = self.request.user

        # Check if the user has the required permission (is_teacher)
        if not user.is_teacher:
            # Return 403 Forbidden response if the user does not have the permission
            self.permission_denied(self.request)

        # Retrieve or create the user's profile
        profile, created = Profile.objects.get_or_create(user=user)

        return profile

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

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
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer