from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CustomUser, Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            raise serializers.ValidationError('Укажите все данные')

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError('Неверные данные')

        if not user.is_active:
            raise serializers.ValidationError('Аккаунт деактивирован')

        data['user'] = user
        return data

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'user', 'title', 'description', 'points_to_complete', 'current_points', 'created_at', 'updated_at')
        read_only_fields = ('user', 'current_points', 'created_at', 'updated_at')

    def create(self, validated_data):
        task = Task.objects.create(**validated_data)
        return task