from rest_framework import permissions

class IsStaffOrTeacherOrUniversity(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and (request.user.is_staff or request.user.is_teacher or request.user.is_university)
        )

class IsAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user
