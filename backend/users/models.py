from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        extra_fields.setdefault('is_teacher', True)  # Assign the 'is_teacher' role
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_university = models.BooleanField(default=False)
    is_default = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class TeacherProfile(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    bio = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=50, blank=True)
    country = models.CharField(max_length=50, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    experience = models.PositiveIntegerField(null=True, blank=True)
    skills = models.TextField(blank=True)

    objects = models.Manager()

    def __str__(self):
        return f"{self.user.email} - Profile"

class UniversityProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    full_university_name = models.CharField(max_length=255)
    abbreviation = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    

    def __str__(self):
        return f"{self.user.email} - University Profile"

@receiver(post_save, sender=CustomUser)
def create_teacher_profile(sender, instance, created, **kwargs):
    if created and instance.is_teacher:
        TeacherProfile.objects.create(user=instance)

@receiver(post_save, sender=CustomUser)
def create_university_profile(sender, instance, created, **kwargs):
    if created and instance.is_university:
        UniversityProfile.objects.create(user=instance)

class TeacherUser(CustomUser):
    class Meta:
        proxy = True
        verbose_name = 'Teacher'
        verbose_name_plural = 'Teachers'

class UniversityUser(CustomUser):
    class Meta:
        proxy = True
        verbose_name = 'University'
        verbose_name_plural = 'Universities'

class StaffUser(CustomUser):
    class Meta:
        proxy = True
        verbose_name = 'Staff'
        verbose_name_plural = 'Staff'

class ExamQuestion(models.Model):
    question_text = models.CharField(max_length=255)
    options = models.TextField()  # Store options as JSON or comma-separated values
    correct_answer = models.CharField(max_length=255)

    def __str__(self):
        return self.question_text

class TeacherApplication(models.Model):
    QUALIFICATION_CHOICES = (
        ('B', 'Bachelor'),
        ('M', 'Master'),
        ('P', 'Ph.D.'),
        ('O', 'Other'),
    )
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='teacher_application')
    qualification = models.CharField(max_length=1, choices=QUALIFICATION_CHOICES)
    experience = models.PositiveIntegerField()
    skills = models.TextField()
    status = models.BooleanField(default=False)
    exam_questions = models.ManyToManyField(ExamQuestion)

    def __str__(self):
        return f"{self.user.email} - Teacher Application"
