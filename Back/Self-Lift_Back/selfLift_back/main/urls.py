from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('users/', views.register_user, name='register'),
    #path('users/all/', views.get_users, name='get-users'),
    path('login/', views.login_users, name='login'),
    #path('login/users/', views.user_list, name='login-users'),
    path('verify-token/', views.verify_token, name='verify-token'),
    path('users/<int:user_id>/tasks/', views.user_tasks, name='user-tasks'),
    # Tasks URLs
    path('users/<int:user_id>/tasks/', views.user_tasks, name='user-tasks'),
]