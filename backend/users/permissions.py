from rest_framework import permissions
from rest_framework.permissions import BasePermission


class CanUpdateProfile(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsUniversity(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_university


class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_teacher


class IsTeacherOrUniversity(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and (request.user.is_teacher or request.user.is_university)
        )
