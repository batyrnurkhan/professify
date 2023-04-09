from rest_framework import serializers
from .models import CustomUser, Profile

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'is_staff', 'is_teacher', 'is_university', 'is_default')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    
    class Meta:
        model = Profile
        fields = ('id', 'user', 'bio', 'birth_date', 'phone_number', 'profile_picture', 'address', 'city', 'country', 'gender', 'age', 'experience', 'skills')

class UniversityViewTeacherSerializer(serializers.ModelSerializer):
    experience = serializers.CharField(source='profile.experience')
    skills = serializers.CharField(source='profile.skills')

    class Meta:
        model = CustomUser
        fields = ['id', 'experience', 'skills']


