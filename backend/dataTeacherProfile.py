import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from users.models import TeacherProfile
from django.contrib.auth import get_user_model



def edit_teacher_profile(user_email, profile_data):
    User = get_user_model()

    try:
        user = User.objects.get(email=user_email)
    except User.DoesNotExist:
        # User does not exist, create a new user
        user = User.objects.create_user(email=user_email, password='batyr123')

    # Check if the user has a TeacherProfile
    if not TeacherProfile.objects.filter(user=user).exists():
        # Create a new TeacherProfile for the user
        teacher_profile = TeacherProfile(user=user)
    else:
        teacher_profile = TeacherProfile.objects.get(user=user)

    # Update the profile fields
    for key, value in profile_data.items():
        setattr(teacher_profile, key, value)

    teacher_profile.save()
    return True


if __name__ == '__main__':
    # Specify the user email and profile data to create a new TeacherProfile
    user_email = 'tilektes@mail.ru'
    profile_data = {
        'first_name': 'ТІЛЕКТЕС',
        'last_name': 'БИСЕНҒАЛИЕВА',
        'bio': '''      Innovative professor of Data Science harnessing the power of data for insights and innovation.   ''',
        'skills': ' Data analysis, machine learning, big data management. ',
        'phone_number': '77777777777',
        'address': '...',
        'city': 'Almaty',
        'experience':10,
    }

    success = edit_teacher_profile(user_email, profile_data)

    if success:
        print("TeacherProfile added successfully.")
    else:
        print("Failed to add TeacherProfile.")
