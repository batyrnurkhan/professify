# Generated by Django 4.2 on 2023-06-07 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0016_examquestion_teacherapplication'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacherprofile',
            name='profile_picture',
            field=models.ImageField(blank=True, default='profile_pictures/free-icon-user-9777892.png', null=True, upload_to='profile_pictures/'),
        ),
    ]
