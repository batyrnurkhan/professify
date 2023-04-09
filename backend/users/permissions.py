from rest_framework import permissions

class CanUpdateProfile(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return (
            request.user.is_authenticated
            and (request.user.is_teacher or request.user.is_university or request.user.is_staff)
            and request.user.is_default
        )

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)

class IsUniversity(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_university #and (request.user.is_teacher or request.user.is_staff or request.user.is_default)
