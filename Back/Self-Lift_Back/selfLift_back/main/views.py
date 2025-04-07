from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import UserSerializer, LoginSerializer, TaskSerializer
from .models import CustomUser, Task
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

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
        'username': user.username,
        'email': user.email
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def user_list(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_token(request):
    print(request.user)
    return Response({
        'user': {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
        }
    })

# --- Task Views --- --- --- --- --- ---

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_tasks(request, user_id):
    # Проверяем, существует ли пользователь
    user = get_object_or_404(CustomUser, pk=user_id)

    # Проверяем, что запрашивающий пользователь - это тот, чьи задачи он пытается получить/создать
    # Или можно разрешить администраторам (если такая роль есть)
    if request.user != user:
        return Response({"detail": "У вас нет разрешения на выполнение этого действия."}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        tasks = Task.objects.filter(user=user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            # Устанавливаем пользователя перед сохранением
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)