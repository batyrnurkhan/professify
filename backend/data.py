import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def create_user(email, password, is_staff=False, is_teacher=False, is_university=False):
    user = User.objects.create_user(
        email=email,
        password=password,
        is_staff=is_staff,
        is_teacher=is_teacher,
        is_university=is_university
    )
    return user

if __name__ == '__main__':
    # Create users here
    user1 = create_user('aleka_0101@bk.ru', 'batyr123', is_teacher=True)
    user2 = create_user('rustem.jumagulov00@mail.ru', 'batyr123', is_teacher=True)

    
    print('Users created successfully.')
