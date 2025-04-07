from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('users/', views.register_user, name='register'),
    path('users/all/', views.get_users, name='get-users'),
    path('login/', views.login_users, name='login'),
    path('login/users/', views.user_list, name='login-users'),
    path('verify-token/', views.verify_token, name='verify-token'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]