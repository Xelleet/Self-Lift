from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.register_user, name='register'),
    path('users/all/', views.get_users, name='get-users'),
    path('login/', views.login_users, name='login'),
]