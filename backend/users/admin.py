from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, TeacherProfile, UniversityProfile, TeacherUser, UniversityUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_teacher', 'is_university', 'is_default')
    list_filter = ('is_staff', 'is_active', 'is_teacher', 'is_university', 'is_default')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_teacher', 'is_university', 'is_default', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active', 'is_teacher', 'is_university', 'is_default')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)

class TeacherProfileInline(admin.StackedInline):
    model = TeacherProfile
    can_delete = False
    verbose_name_plural = 'Teacher Profile'

class UniversityProfileInline(admin.StackedInline):
    model = UniversityProfile
    can_delete = False
    verbose_name_plural = 'University Profile'

class TeacherAdmin(CustomUserAdmin):
    inlines = (TeacherProfileInline,)

    def save_model(self, request, obj, form, change):
        obj.is_teacher = True
        super().save_model(request, obj, form, change)

class UniversityAdmin(CustomUserAdmin):
    inlines = (UniversityProfileInline,)

    def save_model(self, request, obj, form, change):
        obj.is_university = True
        super().save_model(request, obj, form, change)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(TeacherProfile)
admin.site.register(UniversityProfile)

admin.site.register(TeacherUser, TeacherAdmin)
admin.site.register(UniversityUser, UniversityAdmin)
