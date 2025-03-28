from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serialiser import UserSerializer

class MessageCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer