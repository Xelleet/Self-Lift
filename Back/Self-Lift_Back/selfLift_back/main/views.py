from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import UserSerializer, LoginSerializer
from .models import CustomUser
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_users(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def login_users(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = serializer.validated_data['user']
    token,_= Token.objects.get_or_create(user=user)

    return Response({
        'token': token.key,
        'user_id': user.id,
        'username': user.username
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def user_list(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_token(request):
    return Response({
        'user': {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
        }
    })