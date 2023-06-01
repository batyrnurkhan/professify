from rest_framework import permissions
from rest_framework.permissions import BasePermission


class CanUpdateProfile(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)

class IsUniversity(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_university #and (request.user.is_teacher or request.user.is_staff or request.user.is_default)
