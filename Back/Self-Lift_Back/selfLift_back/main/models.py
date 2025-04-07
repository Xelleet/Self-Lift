from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    class Meta:
        permissions = [
            ("can_view_profile", "Can view profile"),
        ]

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to.',
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )

    def __str__(self):
        return self.username

class Task(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='tasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True) # Описание необязательно
    points_to_complete = models.PositiveIntegerField()
    current_points = models.PositiveIntegerField(default=0) # Текущие очки начинаются с 0
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title} ({self.user.username})'