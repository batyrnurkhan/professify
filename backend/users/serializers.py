from rest_framework import serializers
from .models import CustomUser, TeacherProfile, UniversityProfile, ExamQuestion, TeacherApplication

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'password', 'is_staff', 'is_teacher', 'is_university', 'is_default')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class TeacherProfileSerializer(serializers.ModelSerializer):
    is_teacher = serializers.BooleanField(source='user.is_teacher', read_only=True)
    is_university = serializers.BooleanField(source='user.is_university', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    class Meta:
        model = TeacherProfile
        fields = ['email', 'first_name', 'last_name', 'bio', 'skills', 'phone_number', 'address', 'city', 'experience', 'profile_picture', 'is_teacher', 'is_university']

class UniversityProfileSerializer(serializers.ModelSerializer):
    is_teacher = serializers.BooleanField(source='user.is_teacher', read_only=True)
    is_university = serializers.BooleanField(source='user.is_university', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    class Meta:
        model = UniversityProfile
        fields = ('email', 'full_university_name', 'abbreviation', 'city', 'address', 'phone_number', 'profile_picture', 'is_teacher', 'is_university')

class UpdateUniversityProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniversityProfile
        fields = ('full_university_name', 'abbreviation', 'city', 'address', 'phone_number', 'profile_picture')
        extra_kwargs = {
            'full_university_name': {'required': False},
            'abbreviation': {'required': False},
            'city': {'required': False},
            'address': {'required': False},
            'phone_number': {'required': False},
            'profile_picture': {'required': False},
        }

class UpdateTeacherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = ('first_name', 'last_name', 'bio', 'skills', 'phone_number', 'address', 'city', 'experience', 'profile_picture')
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'bio': {'required': False},
            'skills': {'required': False},
            'phone_number': {'required': False},
            'address': {'required': False},
            'city': {'required': False},
            'experience': {'required': False},
            'profile_picture': {'required': False},
        }


class UniversityViewTeacherSerializer(serializers.ModelSerializer):
    experience = serializers.CharField(source='teacher_profile.experience')
    skills = serializers.CharField(source='teacher_profile.skills')

    class Meta:
        model = CustomUser
        fields = ['id', 'experience', 'skills']

class ExamQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamQuestion
        fields = '__all__'

class TeacherApplicationSerializer(serializers.ModelSerializer):
    exam_questions = ExamQuestionSerializer(many=True)

    class Meta:
        model = TeacherApplication
        fields = ('qualification', 'experience', 'skills', 'exam_questions')

    def create(self, validated_data):
        exam_questions_data = validated_data.pop('exam_questions')
        teacher_application = TeacherApplication.objects.create(**validated_data)
        teacher_application.exam_questions.set(exam_questions_data)
        return teacher_application