# Generated by Django 4.2 on 2023-05-30 08:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_remove_customuser_first_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='name',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='surname',
        ),
    ]
