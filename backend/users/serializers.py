from rest_framework import serializers
from .models import CustomUser, Profile

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'password', 'is_staff', 'is_teacher', 'is_university', 'is_default')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = ('id', 'user', 'first_name', 'last_name', 'bio', 'birth_date', 'phone_number', 'profile_picture', 'address', 'city', 'country', 'gender', 'age', 'experience', 'skills')
        read_only_fields = ('id', 'user')

class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'bio', 'birth_date', 'phone_number', 'profile_picture', 'address', 'city', 'country', 'gender', 'age', 'experience', 'skills')
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
        }


class UniversityViewTeacherSerializer(serializers.ModelSerializer):
    experience = serializers.CharField(source='profile.experience')
    skills = serializers.CharField(source='profile.skills')

    class Meta:
        model = CustomUser
        fields = ['id', 'experience', 'skills']



