from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Profile, TeacherUser, UniversityUser, StaffUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_teacher', 'is_university', 'is_default')
    list_filter = ('is_staff', 'is_active', 'is_teacher', 'is_university', 'is_default')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_teacher', 'is_university', 'is_default', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'is_staff', 'is_active', 'is_teacher', 'is_university', 'is_default')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)

class TeacherAdmin(CustomUserAdmin):
    list_filter = ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
    list_display_links = None

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_teacher=True)

    def save_model(self, request, obj, form, change):
        obj.is_teacher = True
        super().save_model(request, obj, form, change)

class UniversityAdmin(CustomUserAdmin):
    list_filter = ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
    list_display_links = None

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_university=True)

    def save_model(self, request, obj, form, change):
        obj.is_university = True
        super().save_model(request, obj, form, change)

class StaffAdmin(CustomUserAdmin):
    list_filter = ('is_active', 'is_superuser', 'groups', 'user_permissions')
    list_display_links = None

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_staff=True, is_teacher=False, is_university=False)

    def save_model(self, request, obj, form, change):
        obj.is_staff = True
        obj.is_teacher = False
        obj.is_university = False
        super().save_model(request, obj, form, change)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Profile)

admin.site.register(TeacherUser, TeacherAdmin)
admin.site.register(UniversityUser, UniversityAdmin)
admin.site.register(StaffUser, StaffAdmin)