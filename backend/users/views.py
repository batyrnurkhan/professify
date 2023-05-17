from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import CustomUserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import Profile, CustomUser
from .serializers import CustomUserSerializer, ProfileSerializer, UniversityViewTeacherSerializer
from rest_framework import generics, permissions
from .permissions import CanUpdateProfile, IsUniversity
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import logout

class CreateUserView(generics.CreateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = (AllowAny,)


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_teacher': user.is_teacher,
            'is_university': user.is_university,
            'is_default': user.is_default,
        })

class UserProfile(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated, CanUpdateProfile]

    def get_object(self):
        profile, created = Profile.objects.get_or_create(user=self.request.user)
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

class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)
    

class ResumesView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer