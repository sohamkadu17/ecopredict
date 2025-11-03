from django.urls import path
from .views import chat_with_bot

urlpatterns = [
    path('api/chat/', chat_with_bot, name='chat_with_bot'),
]
